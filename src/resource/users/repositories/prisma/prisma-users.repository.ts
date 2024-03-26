import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { QueryUserDto } from "../../dto/query-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UsersRepository } from "../users.repository";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(data: CreateUserDto): Promise<void> {
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                cpf: data.cpf,
                latitude: data.latitude,
                longitude: data.longitude,
                createdAt: new Date(),
            }
        })
    }

    async findAll(query: QueryUserDto) {

        let { page = 1, limit = 10, search = '', name, email, cpf } = query;

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
                { cpf: { contains: search } },
            ];
        }

        if (name) {
            whereCondition.name = { contains: name };
        }

        if (email) {
            whereCondition.email = email;
        }

        if (cpf) {
            whereCondition.cpf = cpf;
        }

        const total = await this.prisma.user.count({
            where: whereCondition,
        });

        const users = await this.prisma.user.findMany({
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
            data: users,
        };
    }

    async findUniqueById(id: string): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
                deletedAt: null,
            }
        })

        return user
    }

    async findUniqueByCPF(cpf: string): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf: cpf,
                deletedAt: null,
            }
        })

        return user
    }

    async update(id: string, dataUser: UpdateUserDto): Promise<UserEntity> {
        const user = await this.prisma.user.update({
            where: {
                id: parseInt(id),
                deletedAt: null,
            },
            data: {
                name: dataUser.name,
                email: dataUser.email,
                password: dataUser.password,
                cpf: dataUser.cpf,
                latitude: dataUser.latitude,
                longitude: dataUser.longitude,
                updatedAt: new Date(),
            }
        })

        return user
    }

    async delete(id: string): Promise<void> {
        const user = await this.prisma.user.update({
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