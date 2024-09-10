import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateRestaurant } from 'src/validations/restaurant';
import { RestaurantEntity } from './entities/restaurant.entity';
import { AddressEntity } from '../common/entities/address.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantEntity: Repository<RestaurantEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressEntity: Repository<AddressEntity>
  ) { }
  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const { address, ...restaurant } = createRestaurantDto;
      await validateRestaurant(createRestaurantDto, this.restaurantEntity);

      const newRestaurant = this.restaurantEntity.create({
        ...restaurant
      });

      const savedRestaurant = await this.restaurantEntity.save(newRestaurant);

      const newAddress = this.addressEntity.create({
        ...address,
        restaurant: savedRestaurant,
      });

      await this.addressEntity.save(newAddress);

      return { message: 'Restaurante criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }

  async findAll(search?: string) {
    try {
      const qb = this.restaurantEntity.createQueryBuilder('restaurants')
        .leftJoinAndSelect('restaurants.address', 'address')
        .leftJoinAndSelect('restaurants.products', 'product');

      if (search) {
        qb.where('restaurants.name ILIKE :name', { name: `%${search.trim()}%` });
        qb.orWhere('product.name ILIKE :name', { name: `%${search.trim()}%` });
        qb.orWhere('product.description ILIKE :name', { name: `%${search.trim()}%` });
      }

      return await qb.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.restaurantEntity.createQueryBuilder('restaurants')
        .leftJoinAndSelect('restaurants.address', 'address')
        .leftJoinAndSelect('restaurants.products', 'product')
        .where('restaurants.id = :id', { id: id })
        .select(['restaurants.id', 'restaurants.name', 'restaurants.phone', 'address.street', 'address.neighborhood', 'address.zipCode', 'address.number', 'product'])
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async rateRestaurant(rate: RateRestaurantDto) {
    try {
      const restaurant = await this.restaurantEntity.findOneBy({
        id: rate.restaurantId
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurante não encontrado!');
      }

      const calculateNewRating = (restaurant: RestaurantEntity) => {
        const sum = ((restaurant.stars * restaurant.numberOfReviews) + rate.rate);
        const newRating = sum / (restaurant.numberOfReviews + 1);
        return Math.round(newRating * 10) / 10; // fazer com que o Math.round considere decimais, sem isso ele apenas considera o número inteiro
      };

      const newRating = calculateNewRating(restaurant);

      const updateRestaurantBody = this.restaurantEntity.create({
        ...restaurant,
        stars: newRating,
        numberOfReviews: restaurant.numberOfReviews + 1
      });

      await this.restaurantEntity.save(updateRestaurantBody);

      return { message: 'Avaliação enviada com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}
