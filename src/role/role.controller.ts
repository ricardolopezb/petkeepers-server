import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { HasRoles } from '../auth/decorators';
import { RoleNameDto } from './dto/role-name.dto';
import { RoleService } from './role.service';

@Controller('role')
@HasRoles('ADMIN')
@UseGuards(JwtGuard, AndRoleGuard)
export class RoleController {
    constructor(private roleService: RoleService){}

    @Post('create')
    createRole(@Body() dto: RoleNameDto){
        return this.roleService.createRole(dto)
    }

    @Delete('delete')
    deleteRole(@Body() dto: RoleNameDto){
        return this.roleService.deleteRole(dto)
    }

}
