import { InMemoryRecipientsRepository } from "../../../test/repositories/in-memory-recipients-repository";
import { RecipientsService } from "./recipients.service";

describe('RecipientsService', () => {
    it('should be able to create a new recipient', async () => {
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        await expect(recipientsService.create({
            name: 'name',
            email: 'mail@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        expect(inMemoryRecipientsRepository.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'mail@mail.com'
            })
        ]))
    })

    it('should be able to find all recipients', async () => {
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        await expect(recipientsService.create({
            name: 'name',
            email: 'mail@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        await expect(recipientsService.create({
            name: 'name2',
            email: 'mail2@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        const recipients = await inMemoryRecipientsRepository.findAll()

        expect(recipients).toEqual(expect.arrayContaining([
            expect.objectContaining({
                email: 'mail@mail.com'
            }),
            expect.objectContaining({
                email: 'mail2@mail.com'
            })
        ]))
    })

    it('should be able to find an unique recipient', async () => {
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        await expect(recipientsService.create({
            name: 'name',
            email: 'mail@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        await expect(recipientsService.create({
            name: 'name2',
            email: 'mail2@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        const recipient = await inMemoryRecipientsRepository.findUniqueByEmail('mail2@mail.com')

        expect(recipient).toEqual(expect.objectContaining({
            email: 'mail2@mail.com'
        }))
    })

    it('should be able to update a recipient', async () => {
        const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
        const recipientsService = new RecipientsService(inMemoryRecipientsRepository)

        await expect(recipientsService.create({
            id: 1,
            name: 'name',
            email: 'mail@mail.com',
            createdAt: new Date(),
        }))
            .resolves
            .not
            .toThrow()

        await expect(recipientsService.update())
    })
});
