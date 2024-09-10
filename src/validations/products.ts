import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ProductEntity } from "../products/entities/product.entity";

export async function validateProduct(
  productRequest: CreateProductDto,
  productsModel: Repository<ProductEntity>
): Promise<void> {

  const { name, image, description, price, restaurantId } = productRequest;

  const existingProduct = await productsModel.findOne({
    where: { 
      restaurant: {
        id: Number(restaurantId),
      },
      name
    },
  });
  if (existingProduct) {
    throw new BadRequestException('Produto já cadastrado no restaurante.');
  }

    validateImage(image);
    validateDescription(description);
    validatePrice(price);
}

function validateImage(image: string): void {
  if (!image) {
    image = 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjE9s-nmLSIAxUaC7kGHfaAEQ4Qh-wKegQIGhAD&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Falimentos-basicos_4437673&usg=AOvVaw3Hiqrp6BvJGMKVoP94Dl2u&opi=89978449'
  }
}

function validateDescription(description: string): void {
  if (!description || description.length < 2) {
    throw new BadRequestException('Descrição obrigatório.');
  }
}

function validatePrice(price: number): void {
  if (!price) {
    throw new BadRequestException('Preço é obrigatório.');
  }
}
