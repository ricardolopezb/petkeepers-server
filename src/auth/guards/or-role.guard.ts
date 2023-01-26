import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { Observable } from "rxjs";
import { BaseRoleGuard } from "./base-role.guard";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../user/user.service";


Injectable()
export class OrRoleGuard implements CanActivate {
    baseRoleGuard: BaseRoleGuard
    constructor(
        private reflector: Reflector, 
        @Inject(forwardRef(() => UserService)) private userService: UserService
    ){
        const matchingFunction = async (requiredRoles, userRoles) => {
            if(!userRoles) return new Promise<boolean>(()=> false);
            return requiredRoles.some((requiredRole) => userRoles.includes(requiredRole))
        }
        this.baseRoleGuard = new BaseRoleGuard(reflector, userService, matchingFunction)
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.baseRoleGuard.canActivate(context);
    }
    
}