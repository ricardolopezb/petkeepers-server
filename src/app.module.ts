import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LocalizationModule } from './localization/localization.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';


@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    LocalizationModule,
    AdminModule,
    UserModule,
    PetModule,
  ],
})
export class AppModule {}
