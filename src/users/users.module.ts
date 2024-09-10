import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from '../common/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AddressEntity
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
