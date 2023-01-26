import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AnimalService, RoleService } from './service';

@Module({
  controllers: [AdminController],
  providers: [AnimalService, RoleService]
})
export class AdminModule {}
