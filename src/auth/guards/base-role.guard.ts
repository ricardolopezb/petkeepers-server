import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "../../user/user.service";


export class BaseRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
        private matchingFunction: (requiredRoles: string[], userRoles: string[]) => Promise<boolean> 
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const rolesInUpperCase = roles.map((role) => role.toUpperCase())
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.getRolesAndMatch(user.id, rolesInUpperCase)
        
    }

    async getRolesAndMatch(userId: string, rolesInUpperCase: string[]){
        const userRoles = await this.getUserRolesById(userId)
        console.log({
            userRoles,
            requiredRoles: rolesInUpperCase
        });
        return this.matchingFunction(rolesInUpperCase, userRoles);
    }

    async getUserRolesById(userId: string): Promise<string[]>{
        const userRoles = await this.userService.getUserRolesById(userId)
        if(!userRoles) return null
        else return userRoles.map((role) => role.toUpperCase())

    }

}

 
