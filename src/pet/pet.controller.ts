import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';

@Controller('pet')
@UseGuards(JwtGuard)
export class PetController {
    

}
