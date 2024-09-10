import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { RestaurantSeeder } from "./restaurant.seeder";
import { AddressSeeder } from "./address.seeder";
import { ProductSeeder } from "./product.seeder";
import { UserSeeder } from "./user.seeder";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, RestaurantSeeder);
    await runSeeder(dataSource, AddressSeeder);
    await runSeeder(dataSource, ProductSeeder);
  }
}