import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { HasRoles } from '../auth/decorators/has-role.decorator';
import { BaseRoleGuard } from '../auth/guards/base-role.guard';
import { MatchingCondition } from '../auth/decorators/role-matching-condition.enum';
import { AndRoleGuard } from '../auth/guards/and-role.guard';
import { OrRoleGuard } from '../auth/guards/or-role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HasRoles('user', 'admin', 'other')
  @UseGuards(JwtGuard, AndRoleGuard)
  hello(){
    return "paso el JWT"
  }


}
