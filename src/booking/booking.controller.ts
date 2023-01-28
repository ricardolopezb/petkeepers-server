import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';
import { RequestBookingDto } from './dto';
import { BookingService } from './booking.service';

@Controller('booking')
@UseGuards(JwtGuard)
export class BookingController {
    constructor(private bookingService: BookingService){}

    @Post()
    requestBooking(@Body() dto: RequestBookingDto){
        return this.bookingService.requestBooking(dto)
    }


}

/**
 * owner le requestea a un worker un servicio para 1 o mas pets
 * 
 * 
 */