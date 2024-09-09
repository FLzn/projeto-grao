import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { AddressEntity } from '../common/entities/address.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantEntity,
      AddressEntity,
      ProductEntity
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, ProductsService]
})
export class RestaurantsModule {}
