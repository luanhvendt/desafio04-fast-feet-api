import { BadRequestException } from "@nestjs/common";
import { CreateRecipientDto } from "../../src/resource/recipients/dto/create-recipient.dto";
import { UpdateRecipientDto } from "../../src/resource/recipients/dto/update-recipient.dto";
import { RecipientEntity } from "../../src/resource/recipients/entities/recipient.entity";
import { RecipientsRepository } from "../../src/resource/recipients/repositories/recipients.repository";

let id: number = 1

export class InMemoryRecipientsRepository implements RecipientsRepository {
    public items: any = []

    async create(data: CreateRecipientDto): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].email === data.email) {
                throw new BadRequestException('Recipient already exists.')
            }
        }

        const recipient = {
            id,
            name: data.name,
            email: data.email,
            createdAt: new Date()
        }

        this.items.push(recipient)

        id += 1
    }

    async findAll() {
        return this.items
    }

    async findUniqueById(id: string): Promise<RecipientEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                return this.items[i]
            }
        }
    }

    async findUniqueByEmail(email: string): Promise<RecipientEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].email === email) {
                return this.items[i]
            }
        }
    }

    findNotifications(recipient_id: string) { }

    async update(id: string, dataRecipient: UpdateRecipientDto): Promise<RecipientEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                this.items[i].name = dataRecipient.name
                this.items[i].email = dataRecipient.email
                this.items[i].updatedAt = new Date()

                return this.items[i]
            }
        }
    }

    async delete(id: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                this.items.splice(i, 1);
            }
        }
    }
}