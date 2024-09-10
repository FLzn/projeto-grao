import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductType } from "../../enums/product-type.enum";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @IsString()
  description: string;

  restaurantId: string;
}
