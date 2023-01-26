import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "../../user/user.service";


export class BaseRoleGuard implements CanActivate {
    reflector: Reflector
    userService: UserService
    matchingFunction: (requiredRoles: string[], userRoles: string[]) => Promise<boolean>

    constructor(
        reflector: Reflector,
        userService: UserService,
        matchingFunction: (requiredRoles: string[], userRoles: string[]) => Promise<boolean>
    ){
        this.reflector = reflector
        this.userService = userService
        this.matchingFunction = matchingFunction
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let roles = this.reflector.get<string[]>('roles', context.getClass());
        console.log("ROLES", roles);
        
        if (!roles) {
            roles = this.reflector.get<string[]>('roles', context.getHandler());
        }
        if(!roles){
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

 
