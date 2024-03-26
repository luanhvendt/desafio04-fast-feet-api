import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) { }

  async create(data: CreateUserDto) {
    const findedUser = await this.usersRepository.findUniqueByCPF(data.cpf)

    if (findedUser) {
      throw new BadRequestException('User already exists.')
    }

    return await this.usersRepository.create(data)

  }

  async findAll(query: QueryUserDto) {
    return await this.usersRepository.findAll(query)
  }

  async findUnique(id: string) {
    const user = await this.usersRepository.findUniqueById(id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    return user
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findUnique(id)

    const updatedUser = await this.usersRepository.update(id, data)

    return updatedUser
  }

  async delete(id: string) {
    const user = await this.findUnique(id)

    await this.usersRepository.delete(id)
  }
}
