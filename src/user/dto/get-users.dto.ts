import { IsOptional, IsString, IsUUID } from "class-validator";

export class GetUsersDto {

    @IsOptional()
    @IsString()
    roleName?: string

}