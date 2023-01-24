import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePetDto, EditPetDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetService {
    constructor(private prisma: PrismaService){}

    async editPet(userId: string, petId: string, dto: EditPetDto) {
        try{
            const pet = await this.prisma.pet.findUnique({
                where: {
                    id: petId
                }
            })
            if(!pet) throw new ForbiddenException("Pet does not exist.")
            if(userId != pet.ownerId) throw new ForbiddenException("User is not pet's owner")
            return await this.prisma.pet.update({
                where: {
                    id: petId
                },
                data: {
                    ...dto
                }
            })

        } catch(error){
            this.prisma.readError(error)
        }
    }
    async deletePet(userId: string, petId: string) {
        try{
            const pet = await this.prisma.pet.findUnique({
                where: {
                    id: petId
                }
            })
            if(!pet) throw new ForbiddenException("Pet does not exist.")
            if(userId != pet.ownerId) throw new ForbiddenException("User is not pet's owner")
            return await this.prisma.pet.delete({
                where: {
                    id: petId
                }
            })

        } catch(error){
            this.prisma.readError(error)
        }

    }
    async createPet(userId: string, dto: CreatePetDto) {
        try{
            const pet = await this.prisma.pet.create({
                data: {
                    ...dto,
                    animalName: dto.animalName,
                    ownerId: userId
                }
            })

            return pet;
        } catch(error) {
            this.prisma.readError(error)
        }
    }
    async getPetById(userId: string, petId: string) {
        try {
            const pet = await this.prisma.pet.findFirst({
                where: {
                    id: petId
                }
            })

            if(!pet) throw new ForbiddenException('Pet does not exist.')
            if(userId != pet.ownerId) throw new ForbiddenException('Not your pet.')
            return pet;

        } catch(error){
            this.prisma.readError(error)
        }
    }
    async getAllPets(userId: any) {
        try{
            const pets = await this.prisma.pet.findMany({
                where: {
                    ownerId: userId
                }
            })
            return pets
        } catch(error){
            this.prisma.readError(error)
        }
    }
}
