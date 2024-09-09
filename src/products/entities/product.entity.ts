import { RestaurantEntity } from "../../restaurants/entities/restaurant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column({
    name: 'image',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  image: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255
  })
  description: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.products, {
    onDelete: 'CASCADE',
  })
  restaurant: RestaurantEntity;
}