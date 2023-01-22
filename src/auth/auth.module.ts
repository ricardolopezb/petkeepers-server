import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalizationService } from '../localization/localization.service';
import { LocalizationModule } from '../localization/localization.module';
import { JwtStrategy } from './strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    LocalizationModule,
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
