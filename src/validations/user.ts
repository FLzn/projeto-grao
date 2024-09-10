import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Role } from "../enums/role.enum";

export async function validateUser(
  userRequest: CreateUserDto,
  usersModel: Repository<UserEntity>
): Promise<void> {

  const { name, email, password, role } = userRequest;

  const existingUser = await usersModel.findOne({ where: { email } });
  if (existingUser) {
    throw new BadRequestException('Email já cadastrado no sistema.');
  }

  validateEmail(email);
  validateName(name);
  validatePassword(password);
  validateRole(role);
}

function validateEmail(email: string): void {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new BadRequestException('Email inválido.');
  }
}

function validateName(name: string): void {
  const invalidChars = /[^a-zA-Z\s\-]/g;
  if (invalidChars.test(name)) {
    throw new BadRequestException('Nome contém caracteres inválidos.');
  }
}

function validatePassword(password: string): void {
  if (password.trim().length === 0) {
    throw new BadRequestException('Senha não pode ser vazia.');
  }
  if (password.length < 6) {
    throw new BadRequestException('Senha deve ter pelo menos 6 caracteres.');
  }
}

function validateRole(role: string): void {
  if (!Object.values(Role).includes(role as Role)) {
    throw new BadRequestException(`Cargo inválido. Valores válidos: (${Object.values(Role).join(', ')}).`);
  }
}
