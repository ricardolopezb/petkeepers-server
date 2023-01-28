import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { BookingTypeDto } from "../dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class BookingTypeService {
    constructor(private prisma: PrismaService){}

    async createBookingType(dto: BookingTypeDto){
        try{
            const bookingType = await this.prisma.bookingType.create({
                data: {
                    type: dto.type
                }
            })
            return bookingType;
        } catch(error){
            this.prisma.readError(error)
        }

    }

    async deleteBookingType(dto: BookingTypeDto){
        try {
            const bookingType = await this.prisma.bookingType.delete({
                where: {
                    type: dto.type
                }
            })
            if(!bookingType) throw new ForbiddenException("Booking type not found.")
            return bookingType;
        } catch(error){
            this.prisma.readError(error)
        }
    }
}