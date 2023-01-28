import { IsAlpha, IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class BookingTypeDto {
    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    type: string
}