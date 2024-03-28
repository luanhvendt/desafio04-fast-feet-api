import { Request } from 'express';
import { UserEntity } from '../../resource/users/entities/user.entity';


export interface AuthRequest extends Request {
    user: UserEntity;
}