import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getUserRolesById(userId: string): string[] {
        return ['admin', 'user', 'keeper']
    }
}
