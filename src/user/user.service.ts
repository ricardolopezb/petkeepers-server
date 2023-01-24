import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { clear } from 'console';
import { GetUsersDto } from './dto';

@Injectable()
export class UserService {
    async deleteUser(userId: string) {
        try{
            const user = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    deleted: true
                }
            })
            return this.stripUserUnnecessaryFields(user);
        }
        catch(error){
            this.prisma.readError(error);
        }

    }

    getUsers(query: GetUsersDto){
        if(query.roleName) return this.getUsersByRoleId(query.roleName)
        return this.getAllUsers()
    }

    async getUsersByRoleId(roleName: string) {
      const users = await this.prisma.user.findMany({
        where: {
            roles: {
                some: {
                    roleName
                }
            } 
        }
      })
      return this.stripUsersInList(users)
    }
    constructor(private prisma: PrismaService) {}
    
    async getAllUsers() {
      const users = await this.prisma.user.findMany()
      return this.stripUsersInList(users)
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

    stripUsersInList(users: User[]){
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
