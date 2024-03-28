import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { UsersService } from "./users.service";



describe('UsersService', () => {
    it('should be able to create a new user', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const usersService = new UsersService(inMemoryUsersRepository)

        await expect(usersService.create({
            name: 'name',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryUsersRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'email@mail.com',
            })
        ]));
    })

    it('should be able to find all users', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const usersService = new UsersService(inMemoryUsersRepository)

        await expect(usersService.create({
            name: 'name',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(usersService.create({
            name: 'name2',
            email: 'email2@mail.com',
            password: '12345',
            cpf: '11111111112',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        const users = await inMemoryUsersRepository.findAll()

        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'email@mail.com',
            }),
            expect.objectContaining({
                email: 'email2@mail.com',
            }),
        ]))
    })

    it('should be able to find an unique user', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const usersService = new UsersService(inMemoryUsersRepository)

        await expect(usersService.create({
            name: 'name',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(usersService.create({
            name: 'name2',
            email: 'email2@mail.com',
            password: '12345',
            cpf: '11111111112',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        const user = await inMemoryUsersRepository.findUniqueByCPF('11111111111')

        expect(user).toEqual(expect.objectContaining({
            email: 'email@mail.com',
        }))
    })

    it('should be able to update an user', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const usersService = new UsersService(inMemoryUsersRepository)

        await expect(usersService.create({
            id: 1,
            name: 'name',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(usersService.update('6', {
            name: 'editado',
        }))
            .resolves
            .not
            .toThrow()

        const updatedUser = await inMemoryUsersRepository.findUniqueById('6')

        expect(updatedUser).toEqual(expect.objectContaining({
            name: 'editado'
        }))
    })

    it('should be able to delete an user', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const usersService = new UsersService(inMemoryUsersRepository)

        await expect(usersService.create({
            name: 'name',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date()
        }))
            .resolves
            .not
            .toThrow()

        await expect(usersService.delete('7'))
            .resolves
            .not
            .toThrow()

        expect(inMemoryUsersRepository.items).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'email@mail.com',
            })
        ]))
    })
})
