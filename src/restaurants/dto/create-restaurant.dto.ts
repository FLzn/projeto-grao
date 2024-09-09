import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsPhoneNumber, IsString, Matches } from "class-validator";
import { AddressDto } from "src/users/dto/create-user.dto";

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
    message: 'Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX',
  })
  phone: string;

  @IsString()
  cnpj: string;

  @IsString()
  icon: string;

  @IsNumber()
  deliveryFee: number;

  @IsNumber()
  averagePrepTime: number;

  @IsObject()
  @IsNotEmptyObject()
  address: AddressDto;
}
