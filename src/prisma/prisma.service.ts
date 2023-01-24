import { ForbiddenException, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        })
    }

    readError(error: Error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002') throw new ForbiddenException('Unique constraint violation.')
            if(error.code === 'P2003') throw new ForbiddenException('Non-existing foreign key')

        }

        throw error
    }

    // cleanDb(){
    //     return this.$transaction([
    //         this.bookmark.deleteMany(),
    //         this.user.deleteMany(),
    //     ])
    // }

}