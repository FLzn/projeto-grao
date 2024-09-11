import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RestaurantEntity } from '../../restaurants/entities/restaurant.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.address, {
    onDelete: 'CASCADE',
    nullable: true
  })
  users: UserEntity;

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.address, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
