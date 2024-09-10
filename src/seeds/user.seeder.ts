import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserEntity } from "../users/entities/user.entity";
import { Role } from "../enums/role.enum";

dotenv.config();

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, 10);

    const userData: Partial<UserEntity> = {
      name: 'Fred',
      email: 'fred@graodireto.com.br',
      password: hashedPassword,
      role: Role.Admin
    };

    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
  }
}
