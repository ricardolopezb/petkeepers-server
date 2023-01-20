import { Address, Pet, Role } from "@prisma/client"

export class RegisterDto {
    firstName: string
    lastName: string
    dob: Date
    email: string
    password: string
    bio?: string
    petDescription?: string
    rolesIds: string[]
    pets: Pet[]
    address: String
}