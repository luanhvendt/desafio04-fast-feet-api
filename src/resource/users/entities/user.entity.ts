export class UserEntity {
    id: Number;
    type: 'ADMIN' | 'ENTREGADOR';
    name: String;
    email: String;
    password: String;
    cpf: String;
    latitude: Number;
    longitude: Number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
