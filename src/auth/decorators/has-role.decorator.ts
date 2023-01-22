import { SetMetadata } from "@nestjs/common";
import { MatchingCondition } from "./role-matching-condition.enum";

export const HasRoles = (...HasRoles: string[]) => SetMetadata('roles', HasRoles)