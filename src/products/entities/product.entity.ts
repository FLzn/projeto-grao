import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantEntity } from "../../restaurants/entities/restaurant.entity";
import { ProductType } from "../../enums/product-type.enum";

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

  @Column({
    type: 'enum',
    enum: ProductType,
    nullable: false
  })
  type: ProductType;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.products, {
    onDelete: 'CASCADE',
  })
  restaurant: RestaurantEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}