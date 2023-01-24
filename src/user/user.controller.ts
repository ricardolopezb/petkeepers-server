import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { GetUser, HasRoles } from '../auth/decorators';
import { GetUsersDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('me')
  //@UseGuards(AndRoleGuard)
  getMe(@GetUser('id') userId: string){
    return this.userService.getUserById(userId)
  }

  @Get()
  getUsers(@Query() query: GetUsersDto){
    return this.userService.getUsers(query)
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string){
    return this.userService.getUserById(userId)
  }

  @Delete()
  deleteUser(@GetUser('id') userId: string){
    return this.userService.deleteUser(userId)
  }

  
 

}
