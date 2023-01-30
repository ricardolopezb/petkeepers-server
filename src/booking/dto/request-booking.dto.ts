import { IsNotEmpty, IsString, IsUppercase } from "class-validator"
import { PartOfDay } from "../model"


export class RequestBookingDto {

    @IsString()
    @IsNotEmpty()
    ownerId: string
    @IsString()
    @IsNotEmpty()
    workerId: string

    @IsNotEmpty()
    @IsUppercase()
    bookingType: string

    @IsNotEmpty()
    possibleDates: Date[]

    @IsNotEmpty()
    timePreferences: PartOfDay[]
}