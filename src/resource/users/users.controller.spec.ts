import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import { UsersModule } from './users.module';

let testAccessToken

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

    afterEach(async () => {
        const user = await prisma.user.findUnique({
            where: {
                cpf: '00000000000'
            }
        })

        if (user) {
            await prisma.refreshToken.deleteMany({
                where: {
                    user_id: user.id,
                },
            });

            await prisma.user.deleteMany({
                where: {
                    cpf: '00000000000',
                },
            });
        }
    });


    test('[POST] /auth/login', async () => {
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                cpf: '11111111111',
                password: '12345'
            })

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken


        expect(responseLogin.status).toBe(200)
    })

    test('[POST] /users', async () => {
        const response = await request(app.getHttpServer())
            .post('/users')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                name: 'teste',
                email: 'teste@mail.com',
                password: '12345',
                cpf: '00000000000',
                latitude: 100,
                longitude: 100
            })

        expect(response.statusCode).toBe(201)
    })

    test('[PUT] /users/:id', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'teste',
                email: 'teste@mail.com',
                password: '12345',
                cpf: '00000000000',
                latitude: 100,
                longitude: 100
            }
        })

        const response = await request(app.getHttpServer())
            .put(`/users/${user.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                name: 'teste editado'
            })

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /users', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /users/:id', async () => {
        const response = await request(app.getHttpServer())
            .get('/users/1')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[DELETE] /users/:id', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'teste',
                email: 'teste@mail.com',
                password: '12345',
                cpf: '00000000000',
                latitude: 100,
                longitude: 100
            }
        })

        const response = await request(app.getHttpServer())
            .delete(`/users/${user.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })
});
