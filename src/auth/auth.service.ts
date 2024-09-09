import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const passwordIsValid = compareSync(userPassword, user.password);

    if (passwordIsValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Partial<CreateUserDto>): Promise<{ access_token: string }> {
    try {
      const payload = user;
      
      return {
        access_token: this.jwtService.sign(payload)
      };
    } catch (err) {
      throw new HttpException('Não foi possível realizar o login!', HttpStatus.BAD_REQUEST);
    }
  }

  getJwt(jwt: string) {
    return this.jwtService.decode(jwt);
  }

  // getUserIdInsideJwt(jwtAuthorization: string) {
  //   const token = jwtAuthorization.split(' ')[1];
  //   const idUser = this.getJwt(token);
  //   return idUser;
  // }

}
