import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity])
  ],
  controllers: [],
  providers: []
})
export class CommonModule {}
