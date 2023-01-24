import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { RouterModule } from '@nestjs/core';
import { LocalizationService } from '../localization/localization.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private localizationService: LocalizationService,
        private config: ConfigService
        ){}
    
    async register(dto: RegisterDto) {
        const hash = await argon.hash(dto.password)
        const geocodingCoordenates = await this.localizationService.getAddressCoordinates(dto.address.toString())
        try{
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    dob: new Date(dto.dob),
                    email: dto.email.toLowerCase(),
                    password: hash,
                    bio: dto.bio,
                    phoneNumber: dto.phone,
                    petDescription: dto.petDescription,
                    roles: {
                        createMany: {
                            data: dto.roleNames.map((role) => {
                                return {roleName: role}
                            })
                        }
                    },
                    pets: {
                        createMany: {
                            data: dto.pets.map((pet) => {
                                return {
                                    name: pet.name,
                                    animalName: pet.animalName,
                                    breed: pet.breed,
                                    yearOfBirth: pet.yearOfBirth,
                                    description: pet.description
                                }
                                
                            })
                        }
                    },
                    address: {
                        create: {
                            address: dto.address,
                            latitude: geocodingCoordenates.lat,
                            longitude: geocodingCoordenates.long,
                        }   
                    }
                },
            });
            console.log("user");
            
            return {
                id: user.id,
                email:user.email
            }

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                console.log("prisma error", error);
                if(error.code === 'P2002') throw new ForbiddenException('Credentials taken')
            }
            else {
                console.log("error", error);
                throw error
            }
        }
    }

    async login(dto: LoginDto) {
        const userInDatabase = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        checkIfUserWasFound();
        checkIfUserIsDeleted();
        const passwordMatch = await comparePasswords();
        checkPasswordMatch();

        return this.signToken(userInDatabase.id, userInDatabase.email)


        function checkPasswordMatch() {
            if (!passwordMatch)
                throw new UnauthorizedException("Incorrect credentials.");
        }

        async function comparePasswords() {
            return await argon.verify(userInDatabase.password, dto.password);
        }

        function checkIfUserWasFound() {
            if (!userInDatabase)
                throw new UnauthorizedException("Incorrect credentials.");
        }
        function checkIfUserIsDeleted() {
            if (userInDatabase.deleted)
                throw new UnauthorizedException("User is deleted.");
        }
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}>{
        const payload = {
            id: userId,
            email,
        }
        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET')
        })
        return { access_token: token };
    }

}
