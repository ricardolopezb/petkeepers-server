import { Reflector } from "@nestjs/core";
import { UserService } from "../../user/user.service";
import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { BaseRoleGuard } from "./base-role.guard";
import { Observable } from "rxjs";


Injectable()
export class AndRoleGuard implements CanActivate {
    baseRoleGuard: BaseRoleGuard
    constructor(
        private reflector: Reflector, 
        @Inject(forwardRef(() => UserService)) private userService: UserService
    ){
        const matchingFunction = (requiredRoles, userRoles) => {
            if(!userRoles) return false;
            return requiredRoles.every((requiredRole) => userRoles.includes(requiredRole))
        }
        this.baseRoleGuard = new BaseRoleGuard(reflector, userService, matchingFunction)
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.baseRoleGuard.canActivate(context);
    }
    
}