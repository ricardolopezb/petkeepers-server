import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LocalizationModule } from './localization/localization.module';


@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    LocalizationModule,
  ],
})
export class AppModule {}
