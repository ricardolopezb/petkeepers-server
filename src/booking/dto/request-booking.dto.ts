import { IsNotEmpty, IsString } from "class-validator"
import { PartOfDay } from "../model"


export class RequestBookingDto {

    @IsString()
    @IsNotEmpty()
    ownerId: string
    @IsString()
    @IsNotEmpty()
    workerId: string

    @IsNotEmpty()
    possibleDates: Date[]

    @IsNotEmpty()
    timePreferences: PartOfDay[]
}