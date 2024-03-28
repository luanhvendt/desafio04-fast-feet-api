import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientsRepository } from './repositories/recipients.repository';

@Injectable()
export class RecipientsService {
  constructor(private recipientsRepository: RecipientsRepository) { }

  async create(data: CreateRecipientDto) {
    if (!data.name) {
      throw new BadRequestException('Name is required.')
    }

    if (!data.email) {
      throw new BadRequestException('Email is required.')
    }

    const findedRecipient = await this.recipientsRepository.findUniqueByEmail(data.email)

    if (findedRecipient) {
      throw new BadRequestException('Recipient already exists.')
    }

    return await this.recipientsRepository.create(data)
  }

  async findAll(query) {
    return await this.recipientsRepository.findAll(query)
  }

  async findUniqueById(id: string) {
    const recipient = await this.recipientsRepository.findUniqueById(id)

    if (!recipient) {
      throw new BadRequestException('Recipient not found.')
    }

    return recipient
  }

  async findUniqueByEmail(email: string) {
    const recipient = await this.recipientsRepository.findUniqueByEmail(email)

    if (!recipient) {
      throw new BadRequestException('Recipient not found.')
    }

    return recipient
  }

  async findNotifications(recipient_id: string) {
    return await this.recipientsRepository.findNotifications(recipient_id)
  }

  async update(id: string, data: UpdateRecipientDto) {
    const recipient = await this.findUniqueById(id)

    const updatedRecipient = await this.recipientsRepository.update(id, data)

    return updatedRecipient
  }

  async delete(id: string) {
    const recipient = await this.findUniqueById(id)

    return this.recipientsRepository.delete(id)
  }
}
