import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AnimalService, BookingTypeService, RoleService } from './service';

@Module({
  controllers: [AdminController],
  providers: [AnimalService, RoleService, BookingTypeService]
})
export class AdminModule {}
