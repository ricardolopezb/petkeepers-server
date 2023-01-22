import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { clear } from 'console';

@Injectable()
export class UserService {
    async getUsersByRoleId(roleId: string) {
        console.log("received param", roleId);
        
      const users = await this.prisma.user.findMany({
        where: {
            roles: {
                some: {
                    roleId
                }
            } 
        }
      })
      return this.clearUsersInList(users)
    }
    constructor(private prisma: PrismaService) {}
    async getAllUsers() {
      const users = await this.prisma.user.findMany()
      return this.clearUsersInList(users)
    }
   
    async getUserById(userId: string) {
      const user = await this.prisma.user.findUnique({
        where: {
            id: userId
        }
      })
      
      const cleanUser = this.stripUserUnnecessaryFields(user)
      return cleanUser
    }

    clearUsersInList(users: User[]){
        return users.map((user) => this.stripUserUnnecessaryFields(user))
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
