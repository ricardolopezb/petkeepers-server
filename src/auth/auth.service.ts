import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { RouterModule } from '@nestjs/core';
import { LocalizationService } from "../localization/localization.service";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
         
        ){}
    
    async register(dto: RegisterDto) {
        const hash = await argon.hash(dto.password)
        const localizationService = new LocalizationService()
        const geocodingCoordenates = await localizationService.getAddressCoordinates(dto.address.toString())
        try{
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    dob: new Date(dto.dob),
                    email: dto.email,
                    password: hash,
                    bio: dto.bio,
                    petDescription: dto.petDescription,
                    roles: {
                        createMany: {
                            data: dto.rolesIds.map((role) => {
                                return {roleId: role}
                            })
                        }
                    },
                    pets: {
                        createMany: {
                            data: dto.pets.map((pet) => {
                                return {
                                    name: pet.name,
                                    animalId: pet.animalId,
                                    breed: pet.breed,
                                    yearOfBirth: pet.yearOfBirth,
                                    description: pet.description
                                }
                                
                            })
                        }
                    },
                    address: {
                        create: {
                            
                            address: dto.address.toString(),
                            latitude: geocodingCoordenates.lat,
                            longitude: geocodingCoordenates.long
                            
                        }   
                    }
                },
            });
            return user

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002') throw new ForbiddenException('Credentials taken')
            }
            else throw error
        }
    }

    login(dto: LoginDto) {
        
    }    
}
