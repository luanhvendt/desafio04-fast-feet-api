import { BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "../../src/resource/users/dto/create-user.dto";
import { UpdateUserDto } from "../../src/resource/users/dto/update-user.dto";
import { UserEntity } from "../../src/resource/users/entities/user.entity";
import { UsersRepository } from "../../src/resource/users/repositories/users.repository";

let id: number = 1

export class InMemoryUsersRepository implements UsersRepository {
    public items: any = []

    async create(data: CreateUserDto): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].email === data.email) {
                throw new BadRequestException('User already exists.')
            }
        }

        const user = {
            id: data.id || id,
            name: data.name,
            type: 'ENTREGADOR',
            email: data.email,
            password: data.password,
            cpf: data.cpf,
            latitude: data.latitude,
            longitude: data.longitude,
            createdAt: new Date(),
        }

        this.items.push(user)

        id += 1
    }

    async findAll() {
        return this.items
    }

    async findUniqueById(id: string): Promise<UserEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                return this.items[i]
            }
        }
    }

    async findUniqueByCPF(cpf: string): Promise<UserEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].cpf === cpf) {
                return this.items[i]
            }
        }
    }

    async update(id: string, dataUser: UpdateUserDto): Promise<UserEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id)) {
                this.items[i].name = dataUser.name
                this.items[i].email = dataUser.email
                this.items[i].password = dataUser.password
                this.items[i].latitude = dataUser.latitude
                this.items[i].longitude = dataUser.longitude
                this.items[i].updatedAt = new Date

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