import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import { RecipientsModule } from './recipients.module';

let testAccessToken

describe('RecipientsController', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, RecipientsModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    });

    afterEach(async () => {
        await prisma.recipient.deleteMany({
            where: { email: 'mail@mail.com' }
        })
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

    test('[POST] /recipients', async () => {
        const response = await request(app.getHttpServer())
            .post('/recipients')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                name: 'name',
                email: 'mail@mail.com'
            })

        expect(response.statusCode).toBe(201)
    })

    test('[PUT] /recipients/:id', async () => {
        const recipient = await prisma.recipient.create({
            data: {
                name: 'name',
                email: 'mail@mail.com'
            }
        })

        const response = await request(app.getHttpServer())
            .put(`/recipients/${recipient.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                name: 'name editado',
            })

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /recipients', async () => {
        const response = await request(app.getHttpServer())
            .get('/recipients')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /recipients/:id', async () => {
        const response = await request(app.getHttpServer())
            .get('/recipients/1')
            .set('Authorization', `Bearer ${testAccessToken}`)

        expect(response.statusCode).toBe(200)
    })

    test('[DELETE] /recipients/:id', async () => {
        const recipient = await prisma.recipient.create({
            data: {
                name: 'name',
                email: 'mail@mail.com'
            }
        })

        const response = await request(app.getHttpServer())
            .delete(`/recipients/${recipient.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })
});
