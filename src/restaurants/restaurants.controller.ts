import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import { ProductsService } from 'src/products/products.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Post(':restaurantId/products')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Param('restaurantId') restaurantId: string
  ): Promise<MessageDto> {
    const request: CreateProductDto = {
      ...createProductDto,
      restaurantId
    };
    return this.productsService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('search') search?: string
  ): Promise<RestaurantEntity[]> {
    return await this.restaurantsService.findAll(search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<RestaurantEntity> {
    return await this.restaurantsService.findOne(+id);
  }

  @Patch(':id/rate')
  @UseGuards(JwtAuthGuard)
  async rateRestaurant(@Param('id') id: string, @Body() rateRestaurantDto: RateRestaurantDto): Promise<MessageDto> {
    const body: RateRestaurantDto = {
      rate: rateRestaurantDto.rate,
      restaurantId: +id
    };
    return this.restaurantsService.rateRestaurant(body);
  }
}
