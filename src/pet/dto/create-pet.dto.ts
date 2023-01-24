import { IsAlpha, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatePetDto {

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    animalName: string

    @IsOptional()
    @IsString()
    @IsAlpha()
    breed?: string

    @IsNotEmpty()
    yearOfBirth: number

    @IsOptional()
    @IsString()
    description?: string
}
