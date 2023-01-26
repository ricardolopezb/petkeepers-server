import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { clear } from 'console';
import { GetUsersDto } from './dto';
import { LocalizationService } from '../localization/localization.service';
import { LatLong } from '../localization/model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    async getNearbyUsersWithRole(userId: string, roleName: string, range: number) {
        // find users that are near and then filter according to the role they have.



        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    address: {
                        select:{
                            latitude: true,
                            longitude: true
                        }
                    },
                    deleted: true
                    
                }
            })
            if(!user) throw new ForbiddenException("User does not exist.");
            if(user.deleted) throw new ForbiddenException("User is deleted");

            const userLatLong: LatLong = {
                lat: user.address.latitude,
                long: user.address.longitude
            }

            const addresses = await this.prisma.address.findMany({
                include: {
                    users: {
                        where: {
                            roles: {
                                some: {
                                    roleName
                                }
                            },
                            deleted: false
                        }
                    } 
                }
            })
            if(!addresses) throw new ForbiddenException("Addresses not found.")
            
            const nearbyUsers = addresses.filter((address) => {
                return address.users.length !== 0
                    && this.localizationService.areCoordinatesInRange(
                        userLatLong, 
                        {
                            lat: address.latitude,
                            long: address.longitude
                        }, 
                        range
                    )
            
            }).map((address) => address.users)
            
            return nearbyUsers;

        } catch(error){
            this.prisma.readError(error)
        }
    }


    async deleteUser(userId: string) {
        try{

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if(!user) throw new ForbiddenException("User does not exist")

            const deletedUser = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    deleted: true
                }
            })
            return this.stripUserUnnecessaryFields(deletedUser);
        }
        catch(error){
            this.prisma.readError(error);
        }

    }

    getUsers(query: GetUsersDto){
        if(query.roleName) return this.getUsersByRoleName(query.roleName)
        return this.getAllUsers()
    }

    async getUsersByRoleName(roleName: string) {
      const users = await this.prisma.user.findMany({
        where: {
            roles: {
                some: {
                    roleName
                }
            } 
        }
      })
      if(!users) throw new ForbiddenException(`Users with role name ${roleName} not found.`)
      return this.stripUsersInList(users)
    }
    constructor(private prisma: PrismaService, private localizationService: LocalizationService) {}
    
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
      if(!user) throw new ForbiddenException("User does not exist")
      
      const cleanUser = this.stripUserUnnecessaryFields(user)
      return cleanUser
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
        if(!roles) throw new ForbiddenException("User not found or has no roles.")
        const roleNames = roles.map((roleObject) => roleObject.role.name.toUpperCase())
        return roleNames
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
}
