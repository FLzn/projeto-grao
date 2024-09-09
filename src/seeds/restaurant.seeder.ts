import { RestaurantEntity } from "../restaurants/entities/restaurant.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class RestaurantSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const restaurantRepository = dataSource.getRepository(RestaurantEntity);

    const restaurantData: Partial<RestaurantEntity>[] = [
      {
        name: 'The Steakhouse',
        stars: 4.7,
        numberOfReviews: 213,
        averagePrepTime: 60,
        deliveryFee: 0,
        minDeliveryTime: 40,
        maxDeliveryTime: 60,
        description:
          'Um restaurante de carne sofisticado que serve alguns dos melhores cortes de carne da cidade.',
        phone: '(34) 94002-8922',
        cnpj: '53.394.847/0001-64',
        icon: 'https://img.freepik.com/premium-vector/steak-house-restaurant-vector-logo-icon-template_22692-384.jpg?w=2000',
      },
      {
        name: 'Taco Heaven',
        stars: 4.2,
        numberOfReviews: 150,
        averagePrepTime: 45,
        deliveryFee: 5,
        minDeliveryTime: 30,
        maxDeliveryTime: 50,
        description:
          'Restaurante mexicano que oferece tacos, burritos e outros pratos tradicionais.',
        phone: '(34) 94003-1111',
        cnpj: '12.345.678/0001-22',
        icon: 'https://example.com/taco_heaven_icon.jpg',
      },
      {
        name: 'Pizza Italia',
        stars: 4.5,
        numberOfReviews: 180,
        averagePrepTime: 50,
        deliveryFee: 4,
        minDeliveryTime: 35,
        maxDeliveryTime: 55,
        description:
          'Restaurante italiano com pizzas autênticas e pratos de massa.',
        phone: '(34) 94003-2222',
        cnpj: '98.765.432/0001-11',
        icon: 'https://example.com/pizza_italia_icon.jpg',
      }
    ];

    const newRestaurant = restaurantRepository.create(restaurantData);
    await restaurantRepository.save(newRestaurant);
  }
}