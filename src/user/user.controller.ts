import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AndRoleGuard, JwtGuard } from '../auth/guards';
import { GetUser, HasRoles } from '../auth/decorators';


@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HasRoles('user', 'admin')
  @UseGuards(AndRoleGuard)
  hello(){
    return "paso el JWT"
  }

  @Get('/me')
  getMe(@GetUser('id') userId: string){
    return this.userService.getMe(userId)
  }



}
