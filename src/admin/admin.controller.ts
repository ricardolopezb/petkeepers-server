import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AnimalService, RoleService } from './service';
import { AnimalNameDto, BookingTypeDto, RoleNameDto } from './dto';
import { HasRoles } from '../auth/decorators';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { BookingTypeService } from './service/booking-type.service';

@Controller('admin')
@HasRoles('ADMIN')
@UseGuards(JwtGuard, AndRoleGuard)
export class AdminController {
    constructor(
        private roleService: RoleService,
        private animalService: AnimalService,
        private bookingTypeService: BookingTypeService
    ){}

    @Post('createRole')
    createRole(@Body() dto: RoleNameDto){
        return this.roleService.createRole(dto)
    }

    @Delete('deleteRole')
    deleteRole(@Body() dto: RoleNameDto){
        return this.roleService.deleteRole(dto)
    }

    @Post('createAnimal')
    createAnimal(@Body() dto: AnimalNameDto){
        return this.animalService.createAnimal(dto)
    }

    @Delete('deleteAnimal')
    deleteAnimal(@Body() dto: AnimalNameDto){
        return this.animalService.deleteAnimal(dto)
    }

    @Post('createBookingType')
    createBookingType(@Body() dto: BookingTypeDto){
        return this.bookingTypeService.createBookingType(dto)
    }

    @Delete('deleteBookingType')
    deleteBookingType(@Body() dto: BookingTypeDto){
        return this.bookingTypeService.deleteBookingType(dto)
    }

}
