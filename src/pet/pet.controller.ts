import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { GetUser, HasRoles } from '../auth/decorators';
import { PetService } from './pet.service';
import { CreatePetDto, EditPetDto } from './dto';

@Controller('pets')
@HasRoles('OWNER')
@UseGuards(JwtGuard, AndRoleGuard)
export class PetController {
    constructor(private petService: PetService){}
    @Get()
    getAllUserPets(@GetUser('id') userId: string){
        return this.petService.getAllPets(userId)
    }

    @Get(':id')
    getPetById(@GetUser('id') userId: string, @Param('id', ParseUUIDPipe) petId: string){
        return this.petService.getPetById(userId, petId)
    }

    @Post()
    createPet(@GetUser('id') userId: string, @Body() dto: CreatePetDto){
        return this.petService.createPet(userId, dto)
    }

    @Patch(':id')
    editPet(@GetUser('id') userId: string, @Param('id', ParseUUIDPipe) petId: string, @Body() dto: EditPetDto){
        this.petService.editPet(userId, petId, dto)
    }



    @Delete(':id')
    deletePet(@GetUser('id') userId: string, @Param('id', ParseUUIDPipe) petId: string){
        this.petService.deletePet(userId, petId)
    }

}
