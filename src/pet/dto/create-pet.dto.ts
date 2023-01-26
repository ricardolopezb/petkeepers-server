import { IsAlpha, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatePetDto {

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    animalName: string

    @IsOptional()
    @IsString()
    breed?: string

    @IsNotEmpty()
    yearOfBirth: number

    @IsOptional()
    @IsString()
    description?: string
}
