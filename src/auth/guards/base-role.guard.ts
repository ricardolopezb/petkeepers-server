import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "../../user/user.service";


export class BaseRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
        private matchingFunction: (requiredRoles: string[], userRoles: string[]) => boolean 
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const rolesInUpperCase = roles.map((role) => role.toUpperCase())
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userRoles = this.getUserRolesById(user.id)
        console.log({
            userRoles,
            requiredRoles: rolesInUpperCase
        });
        
        return this.matchingFunction(rolesInUpperCase, userRoles);
    }

    getUserRolesById(userId: string): string[]{
        const userRoles = this.userService.getUserRolesById(userId)
        if(!userRoles) return null
        else return userRoles.map((role) => role.toUpperCase())

    }

}

 
