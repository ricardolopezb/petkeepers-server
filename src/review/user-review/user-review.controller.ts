import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AndRoleGuard, JwtGuard, OrRoleGuard } from '../../auth/guards';
import { GetUser, HasRoles } from '../../auth/decorators';
import { CreateUserReviewDto } from './dto';
import { UserReviewService } from './user-review.service';

@Controller('user-review')
@UseGuards(JwtGuard)
export class UserReviewController {
    constructor(private userReviewService: UserReviewService){}


    @Post()
    createUserReview(@GetUser('id') reviewerUserId: string, @Body() dto: CreateUserReviewDto){
        return this.userReviewService.createUserReview(reviewerUserId, dto)
    }

    @Get()
    yet(){
        return "found"
    }

}
