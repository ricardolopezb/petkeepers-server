import { Injectable } from '@nestjs/common';
import { RoleNameDto } from './dto/role-name.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService){}

    async createRole(dto: RoleNameDto){
        try{
            const role = await this.prisma.role.create({
                data: {
                    name: dto.name
                }
            })
            return role;
        } catch(error){
            this.prisma.readError(error)
        }

    }

    async deleteRole(dto: RoleNameDto){
        try {
            const role = await this.prisma.role.delete({
                where: {
                    name: dto.name
                }
            })
            return role;
        } catch(error){
            this.prisma.readError(error)
        }
    }
}
