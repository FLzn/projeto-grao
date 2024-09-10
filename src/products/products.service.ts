import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { validateProduct } from '../validations/products';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/dto/message.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>
  ) { }
  async create(createProductDto: CreateProductDto): Promise<MessageDto> {
    try {
      const { description, image, name, price, type, restaurantId } = createProductDto;
      await validateProduct(createProductDto, this.productEntity);
      const newProduct = this.productEntity.create({
        description,
        image,
        name,
        price,
        type,
        restaurant: {
          id: Number(restaurantId)
        }
      });

      await this.productEntity.save(newProduct);
      return { message: 'Produto cadastrado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}
