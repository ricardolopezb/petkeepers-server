import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getMe(userId: string) {
      const user = await this.prisma.user.findUnique({
        where: {
            id: userId
        }
      })
      
      const cleanUser = this.stripUserUnnecessaryFields(user)
      return cleanUser
    }

    stripUserUnnecessaryFields(user: User) {
        const clonedUser = Object.assign({}, user)
        delete clonedUser.password
        delete clonedUser.createdAt
        delete clonedUser.updatedAt

        return clonedUser

    }
    
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
