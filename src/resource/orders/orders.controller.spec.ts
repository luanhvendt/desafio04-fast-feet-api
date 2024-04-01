import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma.service';
import { OrdersModule } from './orders.module';

let testAccessToken

describe('OrdersController', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, OrdersModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    });

    afterAll(async () => {
        await prisma.notification.deleteMany({
            where: { recipient_id: 1 }
        })

        await prisma.order.deleteMany({
            where: { latitude: 100 }
        })
    });

    test('[POST] /auth/login', async () => {
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                cpf: '51242364854',
                password: 'admin'
            })

        const responseBody = JSON.parse(responseLogin.text)
        const accessToken = responseBody.accesToken
        testAccessToken = accessToken

        expect(responseLogin.status).toBe(200)
    })

    test('[POST] /orders', async () => {
        const response = await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                recipient_id: 1,
                status: 'AGUARDANDO',
                latitude: 100,
                longitude: 100
            })

        expect(response.statusCode).toBe(201)
    })

    test('[PUT] /orders/:id', async () => {
        const order = await prisma.order.create({
            data: {
                delivery_id: 1,
                recipient_id: 1,
                status: 'AGUARDANDO',
                latitude: 100,
                longitude: 100,
            }
        })

        const response = await request(app.getHttpServer())
            .put(`/orders/${order.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send({
                status: 'ENTREGUE'
            })

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /orders', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[GET] /orders/:id', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/1')
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    test('[DELETE] /orders/:id', async () => {
        const order = await prisma.order.create({
            data: {
                delivery_id: 1,
                recipient_id: 1,
                status: 'AGUARDANDO',
                latitude: 100,
                longitude: 100,
            }
        })

        const response = await request(app.getHttpServer())
            .delete(`/orders/${order.id}`)
            .set('Authorization', `Bearer ${testAccessToken}`)
            .send()

        expect(response.statusCode).toBe(200)
    })
});
