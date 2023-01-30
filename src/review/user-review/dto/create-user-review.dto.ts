import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateUserReviewDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    receiverUserId: string

    @Min(0)
    @Max(10)
    @IsNotEmpty()
    @IsNumber()
    points: number

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    traits: [
        {
            traitName: string,
            feeling?: string
        }
    ]

    


}