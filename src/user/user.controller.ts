import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { GetUser, HasRoles } from '../auth/decorators';
import { GetUsersDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('me')
  getMe(@GetUser('id') userId: string){
    return this.userService.getUserById(userId)
  }

  @Get()
  getAllUsers(@Query() query: GetUsersDto){
    return this.userService.getUsers(query)
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string){
    console.log("yo");
    return this.userService.getUserById(userId)
  }

}
