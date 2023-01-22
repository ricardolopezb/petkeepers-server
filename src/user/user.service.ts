import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getUserRolesById(userId: string): Promise<string[]> {
        const roles = await this.prisma.usersToRoles.findMany({
            where: {
                userId: userId
            },
            select: {
                role: {
                    select:{
                        name: true
                    }
                }
            }
            
            
        })
        const roleNames = roles.map((roleObject) => roleObject.role.name.toUpperCase())
        return roleNames
    }
}
