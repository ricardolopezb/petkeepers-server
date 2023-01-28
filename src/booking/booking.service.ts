import { Injectable } from '@nestjs/common';
import { RequestBookingDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService){}


    requestBooking(dto: RequestBookingDto) {
        throw new Error('Method not implemented.');
    }
}
