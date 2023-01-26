import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AnimalService, RoleService } from './service';
import { AnimalNameDto, RoleNameDto } from './dto';
import { HasRoles } from '../auth/decorators';
import { AndRoleGuard, JwtGuard } from '../auth/guards';

@Controller('admin')
@HasRoles('ADMIN')
@UseGuards(JwtGuard, AndRoleGuard)
export class AdminController {
    constructor(
        private roleService: RoleService,
        private animalService: AnimalService
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

}
