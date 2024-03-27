import { Body, Controller, HttpCode, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    async login(@Request() req, @Body() dataLogin: LoginDto) {
        const loginResponse = await this.authService.login(dataLogin)
        return await this.authService.login(dataLogin)
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Body() dataRefresh: RefreshDto) {
        return this.authService.refresh(dataRefresh)
    }
}