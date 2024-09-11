import { AddressEntity } from "../../common/entities/address.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  stars: number;

  @Column({ type: 'int', default: 0 })
  numberOfReviews: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  averagePrepTime: number;

  @Column({
    type: 'real',
  })
  deliveryFee: number;

  @Column({ type: 'int', default: 15 })
  minDeliveryTime: number;

  @Column({ type: 'int', default: 45 })
  maxDeliveryTime: number;

  @Column({
    name: 'description',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column()
  phone: string;

  @Column()
  cnpj: string;

  @Column({
    name: 'icon',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  icon: string;

  @OneToOne(() => AddressEntity, (address) => address.restaurant)
  address: AddressEntity;

  @OneToMany(() => ProductEntity, (product) => product.restaurant)
  products: ProductEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
