import { Address, Pet, Role } from "@prisma/client"
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    firstName: string
    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsDateString()
    @IsNotEmpty()
    dob: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    bio?: string

    @IsString()
    @IsOptional()
    petDescription?: string

    @IsNotEmpty()
    roleNames: string[]

    @IsOptional()
    pets: Pet[]

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsPhoneNumber()
    @IsString()
    phone: string
}