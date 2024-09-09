import { Controller, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../enums/role.enum';
import { Authentication } from 'src/custom-decorators/authentication.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageDto } from 'src/common/dto/message.dto';

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

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
