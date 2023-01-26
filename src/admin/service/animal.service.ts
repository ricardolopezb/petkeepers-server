import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AnimalNameDto } from '../dto';


@Injectable()
export class AnimalService {
    constructor(private prisma: PrismaService){}

    async createAnimal(dto: AnimalNameDto){
        try{
            const animal = await this.prisma.animal.create({
                data: {
                    name: dto.name
                }
            })
            return animal;
        } catch(error){
            this.prisma.readError(error)
        }

    }

    async deleteAnimal(dto: AnimalNameDto){
        try {
            const animal = await this.prisma.animal.delete({
                where: {
                    name: dto.name
                }
            })
            return animal;
        } catch(error){
            this.prisma.readError(error)
        }
    }
}