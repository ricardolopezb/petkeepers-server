import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { GetUser, HasRoles } from '../auth/decorators';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/me')
  getMe(@GetUser('id') userId: string){
    return this.userService.getUserById(userId)
  }

  @Get("/")
  getAllUsers(){
    return this.userService.getAllUsers()
  }

  @Get('/:id')
  getUserById(@Param('id') userId: string){
    return this.userService.getUserById(userId)
  }

  @Get('/:roleId')
  getUsersByRoleId(@Param('roleId') roleId: string){
    console.log("entro");
    return this.userService.getUsersByRoleId(roleId)
  }

}
