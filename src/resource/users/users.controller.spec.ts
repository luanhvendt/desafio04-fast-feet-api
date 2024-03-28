import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import { UsersModule } from './users.module';

describe('UsersController', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, UsersModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    });

    test('[POST] /auth/login', async () => {
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                cpf: '51242364854',
                password: 'admin'
            })

        expect(responseLogin.status).toBe(200)
    })
});
