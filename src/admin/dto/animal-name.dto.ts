import { IsAlpha, IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class AnimalNameDto {
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @IsUppercase()
    name: string
}