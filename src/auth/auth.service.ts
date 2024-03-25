import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/database/prisma-service";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    private async comparePasswords(
        senha: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(senha, hashedPassword);
    }

    async login(dataLogin: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                cpf: dataLogin.cpf,
                password: dataLogin.password,
            },
        })

        if (!user) {
            throw new BadRequestException('Invalid Credentials.')
        }
        if (!this.comparePasswords(dataLogin.password, user.password[0])) {
            throw new BadRequestException('Invalid Credentials.')
        }

        const payload = { id: user.id }
        const token = this.jwtService.sign(payload)
        const decodedToken = this.jwtService.verify(token) as { exp: number }

        const refreshToken = this.jwtService.sign({
            id: null
        })
        await this.prisma.refreshToken.create({
            data: {
                refreshToken: refreshToken,
                user_id: user.id,
            }
        })

        const data = {
            accesToken: token,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000),
            user
        }

        return data
    }

    async refresh(dataRefresh: RefreshDto) {
        const token = await this.prisma.refreshToken.findFirst({
            where: {
                refreshToken: dataRefresh.refreshToken,
                used: false,
            }
        })

        if (!token) {
            throw new BadRequestException('Invalid Token.')
        }

        if (!(await this.verifyRefreshToken(token.refreshToken))) {
            throw new BadRequestException('Invalid Token.')
        }

        await this.prisma.refreshToken.update({
            where: {
                id: token.id,
            },
            data: {
                used: true,
            },
        })

        const payload = { id: token.user_id };
        const newToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign({
            id: null,
        })

        await this.prisma.refreshToken.create({
            data: {
                refreshToken: refreshToken,
                user_id: token.user_id,
            }
        })

        const decodedToken = this.jwtService.verify(newToken) as {
            exp: number;
        }

        const data = {
            accesToken: newToken,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000)
        }

        return data
    }

    async verifyRefreshToken(token: string) {
        try {
            this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as {
                id: number;
            };
            return decodedToken.id;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async validateUser(payload: { id: string }) {
        const org = await this.prisma.user.findUnique({
            where: { id: Number(payload.id) },
        });
        if (!org) {
            throw new UnauthorizedException();
        }
        return org;
    }
}