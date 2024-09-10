import { IsOptional, IsString } from "class-validator";

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  number: string;

  @IsString()
  zipCode: string;

  @IsString()
  @IsOptional()
  complement: string;
}
