import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { validateProduct } from '../validations/products';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { MessageDto } from 'src/common/dto/message.dto';
import { ProductType } from 'src/enums/product-type.enum';

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

  async getFilteredProducts(type: ProductType): Promise<ProductEntity[]> {
    const products = this.productEntity.createQueryBuilder('products');

    if (type) {
      products.where('type = :type', { type })
    }

    return await products.getMany();
  }
}
