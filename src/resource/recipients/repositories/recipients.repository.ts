import { CreateRecipientDto } from "../dto/create-recipient.dto";
import { QueryRecipientDto } from "../dto/query-recipient.dto";
import { UpdateRecipientDto } from "../dto/update-recipient.dto";
import { RecipientEntity } from "../entities/recipient.entity";

export abstract class RecipientsRepository {
    abstract create(data: CreateRecipientDto): Promise<void>
    abstract findAll(query: QueryRecipientDto)
    abstract findUniqueById(id: string): Promise<RecipientEntity>
    abstract findUniqueByEmail(email: string): Promise<RecipientEntity>
    abstract findNotifications(recipient_id: string)
    abstract update(id: string, dataRecipient: UpdateRecipientDto): Promise<RecipientEntity>
    abstract delete(id: string): Promise<void>
}