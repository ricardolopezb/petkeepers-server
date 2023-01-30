import { Module } from '@nestjs/common';
import { UserReviewController } from './user-review.controller';
import { UserReviewService } from './user-review.service';

@Module({
  controllers: [UserReviewController],
  providers: [UserReviewService]
})
export class UserReviewModule {}
