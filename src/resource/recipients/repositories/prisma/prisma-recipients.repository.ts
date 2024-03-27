import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { QueryUserDto } from "src/resource/users/dto/query-user.dto";
import { CreateRecipientDto } from "../../dto/create-recipient.dto";
import { UpdateRecipientDto } from "../../dto/update-recipient.dto";
import { RecipientEntity } from "../../entities/recipient.entity";
import { RecipientsRepository } from "../recipients.repository";

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(data: CreateRecipientDto): Promise<void> {
        const recipient = await this.prisma.recipient.create({
            data: {
                name: data.name,
                email: data.email,
            }
        })
    }

    async findAll(query: QueryUserDto) {
        let { page = 1, limit = 10, search = '', name, email } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            deletedAt: null,
        };

        if (search) {
            whereCondition.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
            ];
        }

        if (name) {
            whereCondition.name = { contains: name };
        }

        if (email) {
            whereCondition.email = email;
        }

        const total = await this.prisma.recipient.count({
            where: whereCondition,
        });

        const recipients = await this.prisma.recipient.findMany({
            where: whereCondition,
            skip,
            take: limit,
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: recipients,
        };
    }

    async findUniqueById(id: string): Promise<RecipientEntity> {
        const recipient = await this.prisma.recipient.findUnique({
            where: {
                id: parseInt(id),
                deletedAt: null,
            }
        })

        return recipient
    }
    async findUniqueByEmail(email: string): Promise<RecipientEntity> {
        const recipient = await this.prisma.recipient.findFirst({
            where: {
                email: email,
                deletedAt: null,
            }
        })

        return recipient
    }

    async findNotifications(recipient_id: string) {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipient_id: parseInt(recipient_id),
            }
        })

        return notifications
    }

    async update(id: string, dataRecipient: UpdateRecipientDto): Promise<RecipientEntity> {
        const recipient = await this.prisma.recipient.update({
            where: {
                id: parseInt(id),
                deletedAt: null,
            },
            data: {
                name: dataRecipient.name,
                email: dataRecipient.email,
                updatedAt: new Date()
            }
        })

        return recipient
    }

    async delete(id: string): Promise<void> {
        const recipient = await this.prisma.recipient.update({
            where: {
                id: parseInt(id),
                deletedAt: null,
            },
            data: {
                deletedAt: new Date(),
            }
        })
    }
}