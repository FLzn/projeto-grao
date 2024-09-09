import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUser } from 'src/validations/user';
// import UserErrorsDto from './dto/user-errors.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { validateAddress } from 'src/validations/address';
import { AddressEntity } from '../common/entities/address.entity';
import { MessageDto } from 'src/common/dto/message.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersEntity: Repository<UserEntity>,

    @InjectRepository(AddressEntity)
    private readonly addressEntity: Repository<AddressEntity>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const { address, ...user } = createUserDto;
      await validateUser(createUserDto, this.usersEntity);
      await validateAddress(createUserDto);
      const hashedPassword = await this.hashPassword(createUserDto.password);

      const newUserEntity = this.usersEntity.create({
        ...user,
        password: hashedPassword
      });

      const saveUser = await this.usersEntity.save(newUserEntity);
      if (!saveUser) throw new BadRequestException('Erro na criação do usuário. Tente novamente mais tarde!');

      const newAddressEntity = this.addressEntity.create({
        ...address,
        users: saveUser
      });

      await this.addressEntity.save(newAddressEntity);
      return { message: 'Usuário salvo com sucesso!' };

    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.usersEntity.findOne(
        {
          where: {
            email: email
          },
          relations: ['address'],
        }
      );
      if (user) return user;
      return null;
    } catch (err) {
      return err;
    }
  }

  async selectMainAddress({ addressId, userEmail }: { userEmail: string, addressId: number }): Promise<MessageDto> {
    try {
      const user = await this.getUserByEmail(userEmail);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      const { address } = user;

      const filteredAddress = address.filter((el) => el.id === addressId);

      if (!filteredAddress.length) {
        throw new NotFoundException('Endereço não encontrado.');
      }

      await this.addressEntity.createQueryBuilder()
        .update(AddressEntity)
        .set({
          isActive: () =>
            `CASE
              WHEN id = :addressId THEN true
              ELSE false
            END`,
        })
        .where('usersId = :userId', { userId: user.id })
        .setParameters({ addressId })
        .execute();

      return { message: 'Endereço atual alterado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
