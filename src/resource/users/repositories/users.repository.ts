import { CreateUserDto } from "../dto/create-user.dto";
import { QueryUserDto } from "../dto/query-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<void>
    abstract findAll(query: QueryUserDto)
    abstract findUniqueById(id: string): Promise<UserEntity>
    abstract findUniqueByCPF(cpf: string): Promise<UserEntity>
    abstract update(id: string, dataUser: UpdateUserDto): Promise<UserEntity>
    abstract delete(id: string): Promise<void>
}