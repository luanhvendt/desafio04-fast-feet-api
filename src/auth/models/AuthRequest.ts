import { Request } from 'express';
import { UserEntity } from 'src/resource/users/entities/user.entity';


export interface AuthRequest extends Request {
    user: UserEntity;
}