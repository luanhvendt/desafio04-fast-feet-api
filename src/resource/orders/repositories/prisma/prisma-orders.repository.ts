import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateOrderDto } from "../../dto/create-order.dto";
import { QueryOrderDto } from "../../dto/query-order.dto";
import { UpdateOrderDto } from "../../dto/update-order.dto";
import { OrderEntity } from "../../entities/order.entity";
import { OrdersRepository } from "../orders.repository";

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(currentUserId: string, data: CreateOrderDto): Promise<void> {
        const oder = await this.prisma.order.create({
            data: {
                delivery_id: parseInt(currentUserId),
                recipient_id: data.recipient_id,
                status: data.status,
                latitude: data.latitude,
                longitude: data.longitude,
                photo: data.photo,
                createdAt: new Date()
            }
        })
    }

    async findAll(query: QueryOrderDto) {
        let { page = 1, limit = 10, search = '', delivery_id, recipient_id, status, latitude, longitude } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            deletedAt: null,
        };

        if (search) {
            whereCondition.OR = [
                { delivery_id: { contains: search } },
                { recipient_id: { contains: search } },
                { status: { contains: search } },
                { latitude: { contains: search } },
                { longitude: { contains: search } },
            ];
        }

        if (delivery_id) {
            delivery_id = Number(delivery_id);
            whereCondition.delivery_id = delivery_id;
        }

        if (recipient_id) {
            recipient_id = Number(recipient_id);
            whereCondition.recipient_id = recipient_id;
        }

        if (status) {
            whereCondition.status = status;
        }

        if (latitude) {
            whereCondition.latitude = latitude;
        }

        if (longitude) {
            whereCondition.longitude = longitude;
        }

        const total = await this.prisma.order.count({
            where: whereCondition,
        });

        const orders = await this.prisma.order.findMany({
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
            data: orders,
        };
    }


    async findUniqueById(id: string): Promise<OrderEntity> {
        const order = await this.prisma.order.findUnique({
            where: {
                id: parseInt(id),
                deletedAt: null,
            }
        })

        return order
    }

    async update(id: string, data: UpdateOrderDto): Promise<OrderEntity> {
        const order = await this.prisma.order.update({
            where: {
                id: parseInt(id),
                deletedAt: null,
            },
            data: {
                delivery_id: data.delivery_id,
                recipient_id: data.recipient_id,
                status: data.status,
                latitude: data.latitude,
                longitude: data.longitude,
                photo: data.photo,
                updatedAt: new Date(),
            }
        })

        return order
    }

    async delete(id: string): Promise<void> {
        const order = await this.prisma.order.update({
            where: {
                id: parseInt(id),
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}