import { BadRequestException } from "@nestjs/common";
import { isEmpty } from "class-validator";
import { CreateUserDto } from "../users/dto/create-user.dto";

export async function validateAddress(
  addressRequest: Partial<CreateUserDto>
): Promise<void> {

  if (!addressRequest.address || isEmpty(addressRequest.address)) throw new BadRequestException('Endereço não informado.');

  const { number, street, zipCode, neighborhood } = addressRequest.address;

  validateStreet(street);
  validateNeighborhood(neighborhood);
  validateNumber(number);
  validateZipCode(zipCode);
}

function validateNumber(number: string): void {
  if (number.trim().length === 0) {
    throw new BadRequestException('Número do endereço não informado.');
  }
}

function validateStreet(street: string): void {
  if (street.trim().length === 0) {
    throw new BadRequestException('Rua não informada.');
  }
}

function validateNeighborhood(neighborhood: string): void {
  if (neighborhood.trim().length === 0) {
    throw new BadRequestException('Bairro não informado.');
  }
}

function validateZipCode(zipCode: string): void {
  if (zipCode.trim().length === 0) {
    throw new BadRequestException('CEP não informado.');
  }
}