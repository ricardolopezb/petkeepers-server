import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [UserModule]
})
export class RoleModule {}
