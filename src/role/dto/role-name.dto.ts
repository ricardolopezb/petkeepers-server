import { IsAlpha, IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class RoleNameDto {
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @IsUppercase()
    name: string
}