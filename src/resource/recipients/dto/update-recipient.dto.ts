import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipientDto } from './create-recipient.dto';

export class UpdateRecipientDto extends PartialType(CreateRecipientDto) {
    name?: string;
    email?: string;
    updatedAt: Date;
}
