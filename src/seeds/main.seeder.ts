import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { RestaurantSeeder } from "./restaurant.seeder";
import { AddressSeeder } from "./address.seeder";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, RestaurantSeeder);
    await runSeeder(dataSource, AddressSeeder);
  }
}