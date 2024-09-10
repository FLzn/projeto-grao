import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { ProductEntity } from "../products/entities/product.entity";
import { RestaurantEntity } from "../restaurants/entities/restaurant.entity";
import { ProductType } from "../enums/product-type.enum";

export class ProductSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const restaurantRepository = dataSource.getRepository(RestaurantEntity);
    const productRepository = dataSource.getRepository(ProductEntity);

    const restaurants = await restaurantRepository.find();

    const productData: Partial<ProductEntity>[] = [
      {
        name: 'Pizza',
        description: 'Melhor pizza da cidade',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 79.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Hamburguer',
        description: 'Hamburguer suculento e saboroso',
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 29.99,
        type: ProductType.Food,
        restaurant: restaurants[0]
      },
      {
        name: 'Sushi',
        description: 'Sushi fresco e delicioso',
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        price: 59.99,
        type: ProductType.Food,
        restaurant: restaurants[0]
      },
      {
        name: 'Tacos',
        description: 'Tacos autênticos mexicanos',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 24.99,
        type: ProductType.Food,
        restaurant: restaurants[1]
      },
      {
        name: 'Lasanha',
        description: 'Lasanha à bolonhesa caseira',
        image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 49.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Camarão',
        description: 'Camarão grelhado ao molho especial',
        image: 'https://images.unsplash.com/photo-1594397107804-22dfcdef5a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 89.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Macarrão',
        description: 'Macarrão ao molho pesto',
        image: 'https://images.unsplash.com/photo-1549592406-bf2a4270a071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 39.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Churrasco',
        description: 'Churrasco premium com cortes selecionados',
        image: 'https://images.unsplash.com/photo-1594397108691-61fe6098c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 99.99,
        type: ProductType.Food,
        restaurant: restaurants[0]
      },
      {
        name: 'Frango',
        description: 'Frango assado com ervas',
        image: 'https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
        price: 34.99,
        type: ProductType.Food,
        restaurant: restaurants[1]
      },
      {
        name: 'Bolo de chocolate',
        description: 'Bolo de chocolate cremoso e irresistível',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80',
        price: 19.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Sorvete',
        description: 'Sorvete artesanal de baunilha',
        image: 'https://images.unsplash.com/photo-1484876586759-80555b97b22d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        price: 14.99,
        type: ProductType.Food,
        restaurant: restaurants[2]
      },
      {
        name: 'Cafe',
        description: 'Café gourmet feito na hora',
        image: 'https://plus.unsplash.com/premium_photo-1675362191731-0b7947b5f1b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        price: 9.99,
        type: ProductType.Drink,
        restaurant: restaurants[1]
      },
      {
        name: 'Cha',
        description: 'Chá verde revitalizante',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
        price: 7.99,
        type: ProductType.Drink,
        restaurant: restaurants[2]
      },
      {
        name: 'Suco',
        description: 'Suco natural de laranja',
        image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80',
        price: 6.99,
        type: ProductType.Drink,
        restaurant: restaurants[0]
      },
    ];

    const newProduct = productRepository.create(productData);
    await productRepository.save(newProduct);
  }
}