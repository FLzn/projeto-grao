import { UserEntity } from '../users/entities/user.entity';
import { AddressEntity } from '../common/entities/address.entity';
import { RestaurantEntity } from "../restaurants/entities/restaurant.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class AddressSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const addressRepository = dataSource.getRepository(AddressEntity);
    const restaurantRepository = dataSource.getRepository(RestaurantEntity);
    const userRepository = dataSource.getRepository(UserEntity);

    const restaurant1 = await restaurantRepository.findOneBy({ id: 1 });
    const restaurant2 = await restaurantRepository.findOneBy({ id: 2 });
    const restaurant3 = await restaurantRepository.findOneBy({ id: 3 });

    const user1 = await userRepository.findOneBy({ id: 1 });

    const restaurantData: Partial<AddressEntity>[] = [
      {
        street: 'Rua teste 1',
        neighborhood: 'Bairro teste 1',
        number: '123',
        isActive: true,
        complement: 'complemento teste 1',
        zipCode: '38050000',
        restaurant: restaurant1
      },
      {
        street: 'Rua teste 2',
        neighborhood: 'Bairro teste 2',
        number: '456',
        isActive: true,
        complement: 'complemento teste 2',
        zipCode: '38050000',
        restaurant: restaurant2
      },
      {
        street: 'Rua teste 3',
        neighborhood: 'Bairro teste 3',
        number: '456',
        isActive: true,
        complement: 'complemento teste 3',
        zipCode: '38050000',
        restaurant: restaurant3
      },
      {
        street: 'Rua teste 4',
        neighborhood: 'Bairro teste 4',
        number: '123',
        isActive: true,
        complement: 'complemento teste 4',
        zipCode: '38050000',
        users: user1
      },
      {
        street: 'Rua teste 5',
        neighborhood: 'Bairro teste 5',
        number: '456',
        isActive: false,
        complement: 'complemento teste 5',
        zipCode: '38050000',
        users: user1,
      },
      {
        street: 'Rua teste 6',
        neighborhood: 'Bairro teste 6',
        number: '789',
        isActive: false,
        complement: 'complemento teste 6',
        zipCode: '38050000',
        users: user1
      },
    ]

    const newRestaurant = addressRepository.create(restaurantData);
    await addressRepository.save(newRestaurant)
  }
}