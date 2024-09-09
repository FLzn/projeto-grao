import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { CreateRestaurantDto } from "../restaurants/dto/create-restaurant.dto";
import { RestaurantEntity } from "../restaurants/entities/restaurant.entity";
import { isValidCnpj } from "src/utils/cnpj.validator";

export async function validateRestaurant(
  restaurantRequest: CreateRestaurantDto,
  restaurantModel: Repository<RestaurantEntity>
): Promise<void> {

  const { cnpj, description, icon, name } = restaurantRequest;

  const existingRestaurant = await restaurantModel.findOne({ where: { cnpj } });
  if (existingRestaurant) {
    throw new BadRequestException('Restaurante já cadastrado no sistema.');
  }

  validateCnpj(cnpj);
  validateDescription(description);
  validateIcon(icon);
  validateName(name);
}

function validateCnpj(cnpj: string): void {
  if (!isValidCnpj(cnpj)) {
    throw new BadRequestException('CNPJ inválido.');
  }
}

function validateDescription(description: string): void {
  if (description.trim().length === 0) {
    throw new BadRequestException('Descrição não pode ser vazia.');
  }
}

function validateIcon(icon: string): void {
  if (!icon) {
    icon = 'https://cdn-icons-png.flaticon.com/512/2697/2697432.png'
  }
}
function validateName(name: string): void {
  if (name.trim().length === 0) {
    throw new BadRequestException('Nome não pode ser vazio.');
  }
  if (name.length < 3) {
    throw new BadRequestException('Nome deve ter pelo menos 3 caracteres.');
  }
}
