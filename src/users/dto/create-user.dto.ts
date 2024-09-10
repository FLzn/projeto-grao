import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator";
import { Role } from "../../enums/role.enum";
import { AddressDto } from "src/common/dto/address.dto";

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
