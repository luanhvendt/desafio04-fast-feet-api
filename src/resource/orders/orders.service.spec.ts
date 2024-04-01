import { InMemoryOrdersRepository } from "../../../test/repositories/in-memory-orders-repository";
import { InMemoryRecipientsRepository } from "../../../test/repositories/in-memory-recipients-repository";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { RecipientsService } from "../recipients/recipients.service";
import { UsersService } from "../users/users.service";
import { OrdersService } from "./orders.service";

describe('OrdersService', () => {
    it('should be able to create a new order', async () => {
        const inMemoryOrdersRepository = new InMemoryOrdersRepository()
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const ordersService = new OrdersService(inMemoryOrdersRepository, inMemoryRecipientsRepository, inMemoryUsersRepository)
        const usersService = new UsersService(inMemoryUsersRepository)
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        const user = {
            id: 1,
            name: 'admin',
            email: 'admin@mail.com',
            cpf: '11111111111',
            password: 'admin',
            latitude: 100,
            longitude: 100,
            createdAt: new Date
        }

        const recipient = {
            id: 1,
            name: 'recipient',
            email: 'recipient@mail.com',
            createdAt: new Date(),
        }

        await expect(usersService.create(user)).resolves.not.toThrow()

        await expect(recipientsService.create(recipient)).resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            recipient_id: recipient.id,
            status: 'AGUARDANDO',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        expect(inMemoryOrdersRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                recipient_id: 1,
                status: 'AGUARDANDO',
                latitude: 100,
                longitude: 100,
            })
        ]))
    })

    it('should be able to find all user orders', async () => {
        const inMemoryOrdersRepository = new InMemoryOrdersRepository()
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const ordersService = new OrdersService(inMemoryOrdersRepository, inMemoryRecipientsRepository, inMemoryUsersRepository)
        const usersService = new UsersService(inMemoryUsersRepository)
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        const user = {
            id: 1,
            name: 'admin',
            email: 'admin@mail.com',
            cpf: '11111111111',
            password: 'admin',
            latitude: 100,
            longitude: 100,
            createdAt: new Date
        }

        const recipient = {
            id: 1,
            name: 'recipient',
            email: 'recipient@mail.com',
            createdAt: new Date(),
        }

        await expect(usersService.create(user)).resolves.not.toThrow()

        await expect(recipientsService.create(recipient)).resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            recipient_id: recipient.id,
            status: 'AGUARDANDO',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            recipient_id: recipient.id,
            status: 'DEVOLVIDA',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        const orders = await inMemoryOrdersRepository.findAll()

        expect(orders).toEqual(expect.arrayContaining([
            expect.objectContaining({
                delivery_id: 1,
                recipient_id: 1,
                status: 'AGUARDANDO'
            }),
            expect.objectContaining({
                delivery_id: 1,
                recipient_id: 1,
                status: 'DEVOLVIDA'
            })
        ]))
    })

    it('should be able to find an unique order', async () => {
        const inMemoryOrdersRepository = new InMemoryOrdersRepository()
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const ordersService = new OrdersService(inMemoryOrdersRepository, inMemoryRecipientsRepository, inMemoryUsersRepository)
        const usersService = new UsersService(inMemoryUsersRepository)
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        const user = {
            id: 1,
            name: 'admin',
            email: 'admin@mail.com',
            cpf: '11111111111',
            password: 'admin',
            latitude: 100,
            longitude: 100,
            createdAt: new Date
        }

        const recipient = {
            id: 1,
            name: 'recipient',
            email: 'recipient@mail.com',
            createdAt: new Date(),
        }

        await expect(usersService.create(user)).resolves.not.toThrow()

        await expect(recipientsService.create(recipient)).resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            id: 1,
            recipient_id: recipient.id,
            status: 'AGUARDANDO',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            id: 2,
            recipient_id: recipient.id,
            status: 'DEVOLVIDA',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()


        const order = await inMemoryOrdersRepository.findUniqueById(String(user.id), '2')

        expect(order).toEqual(expect.objectContaining({
            id: 2,
            status: 'DEVOLVIDA',
        }))
    })

    it('should be able to update an order', async () => {
        const inMemoryOrdersRepository = new InMemoryOrdersRepository()
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const ordersService = new OrdersService(inMemoryOrdersRepository, inMemoryRecipientsRepository, inMemoryUsersRepository)
        const usersService = new UsersService(inMemoryUsersRepository)
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        const user = {
            id: 1,
            name: 'admin',
            email: 'admin@mail.com',
            cpf: '11111111111',
            password: 'admin',
            latitude: 100,
            longitude: 100,
            createdAt: new Date
        }

        const recipient = {
            id: 1,
            name: 'recipient',
            email: 'recipient@mail.com',
            createdAt: new Date(),
        }

        await expect(usersService.create(user)).resolves.not.toThrow()

        await expect(recipientsService.create(recipient)).resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            id: 1,
            recipient_id: recipient.id,
            status: 'AGUARDANDO',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        await expect(ordersService.update(String(user.id), '1', {
            status: 'ENTREGUE',
            updatedAt: new Date()
        }))
            .resolves.not.toThrow()

        const updatedOrder = await inMemoryOrdersRepository.findUniqueById(String(user.id), '1')

        expect(updatedOrder).toEqual(expect.objectContaining({
            status: 'ENTREGUE'
        }))
    })

    it('should be able to delete an order', async () => {
        const inMemoryOrdersRepository = new InMemoryOrdersRepository()
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const ordersService = new OrdersService(inMemoryOrdersRepository, inMemoryRecipientsRepository, inMemoryUsersRepository)
        const usersService = new UsersService(inMemoryUsersRepository)
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        const user = {
            id: 1,
            name: 'admin',
            email: 'admin@mail.com',
            cpf: '11111111111',
            password: 'admin',
            latitude: 100,
            longitude: 100,
            createdAt: new Date
        }

        const recipient = {
            id: 1,
            name: 'recipient',
            email: 'recipient@mail.com',
            createdAt: new Date(),
        }

        await expect(usersService.create(user)).resolves.not.toThrow()

        await expect(recipientsService.create(recipient)).resolves.not.toThrow()

        await expect(ordersService.create(String(user.id), {
            id: 1,
            recipient_id: recipient.id,
            status: 'AGUARDANDO',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }))
            .resolves.not.toThrow()

        await expect(ordersService.delete(String(user.id), '1'))
            .resolves.not.toThrow()

        expect(inMemoryOrdersRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 1,
            })
        ]))
    })
});
