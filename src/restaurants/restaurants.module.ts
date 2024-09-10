import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
import { ProductsService } from 'src/products/products.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantEntity } from './entities/restaurant.entity';
import { AddressEntity } from '../common/entities/address.entity';
import { ProductEntity } from '../products/entities/product.entity';

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
