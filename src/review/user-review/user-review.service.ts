import { Injectable } from '@nestjs/common';
import { CreateUserReviewDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserReviewService {
    constructor(private prisma: PrismaService){}

    async createUserReview(reviewerUserId: string, dto: CreateUserReviewDto) {
        try{
            const userReview = await this.prisma.userUserReviews.create({
                data:{
                    receiverUserId: dto.receiverUserId,
                    reviewerUserId,
                    points: dto.points,
                    description: dto.description,
                    userUserReviewTraits: {
                        createMany: {
                            data: dto.traits.map((trait) => {
                                return {traitName: trait.traitName}
                            })
                        }
                    }
                }
            })
            return userReview;

        } catch(error) {
            this.prisma.readError(error)
        }
    }
}
