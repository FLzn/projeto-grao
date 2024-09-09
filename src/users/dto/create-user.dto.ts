import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator";
import { Role } from "../../enums/role.enum";

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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsObject()
  @IsNotEmptyObject()
  address: AddressDto;
}
