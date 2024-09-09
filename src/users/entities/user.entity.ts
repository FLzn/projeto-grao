import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../enums/role.enum";
import { AddressEntity } from "../../common/entities/address.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false
  })
  role: Role;

  @OneToMany(() => AddressEntity, (address) => address.users)
  address: AddressEntity[];
}
