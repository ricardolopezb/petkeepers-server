import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { HasRoles } from '../auth/decorators/has-role.decorator';
import { AndRoleGuard } from '../auth/guards/and-role.guard';
import { OrRoleGuard } from '../auth/guards/or-role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HasRoles('user', 'admin')
  @UseGuards(JwtGuard, AndRoleGuard)
  hello(){
    return "paso el JWT"
  }


}
