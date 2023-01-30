import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LocalizationModule } from './localization/localization.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { BookingModule } from './booking/booking.module';
import { UserReviewService } from './review/user-review/user-review.service';
import { UserReviewModule } from './review/user-review/user-review.module';
import { UserReviewController } from './review/user-review/user-review.controller';


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
    BookingModule,
    UserReviewModule,
  ],
  controllers: [],
  providers: [UserReviewService],
})
export class AppModule {}
