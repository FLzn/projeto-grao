import { Controller, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { Authentication } from 'src/custom-decorators/authentication.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<MessageDto> {
    return this.usersService.create(createUserDto);
  }

  @Patch('/addresses/main-address/:addressId')
  @UseGuards(JwtAuthGuard)
  async selectMainAdress(@Authentication() userEmail: string, @Param('addressId') addressId: number ): Promise<MessageDto> {
    const body = {
      userEmail,
      addressId
    };
    return this.usersService.selectMainAddress(body);
  }
}
