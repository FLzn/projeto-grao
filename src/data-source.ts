import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seeder';
import { UserEntity } from './users/entities/user.entity';
import { RestaurantEntity } from './restaurants/entities/restaurant.entity';
import { AddressEntity } from './common/entities/address.entity';
import { ProductEntity } from './products/entities/product.entity';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    UserEntity,
    RestaurantEntity,
    AddressEntity,
    ProductEntity
  ],
  synchronize: true,
  logging: false,
  seeds: [MainSeeder]
}
export const AppDataSource = new DataSource(options);