import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditPetDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsOptional()
    @IsString()
    description?: string
}