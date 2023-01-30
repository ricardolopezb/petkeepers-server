import { Injectable } from '@nestjs/common';
import { RequestBookingDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService){}


    async requestBooking(dto: RequestBookingDto) {
        // try{
        //     const booking = await this.prisma.booking.create({
        //         data: {
        //             type: {
        //                 connect: {
        //                     type: dto.bookingType
        //                 }
        //             },
        //             startDate: dto.startDate



        //         }


        //     })



        // } catch(error){
        //     this.prisma.readError(error)
        // }
    }
}
