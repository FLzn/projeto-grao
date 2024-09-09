import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.body)
  }
}