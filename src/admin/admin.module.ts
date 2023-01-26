import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './service/admin.service';
import { AnimalService, RoleService } from './service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AnimalService, RoleService]
})
export class AdminModule {}
