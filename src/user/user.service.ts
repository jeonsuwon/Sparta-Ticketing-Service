import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string, phoneNumber: string, address: string, role: string = Role.USER) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const hashedPassword = await hash(password, 10);
    const data = {
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      address,
      role: role as Role, // 기존은 role 이였지만 , User에서 정의된 role의 타입이 전달된 role타입과 다르기때문에 에러 발생 ,
    };
    await this.userRepository.save(data);
    return {...data, password:undefined}
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password','role'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, userRole: user.role , userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  checkUser(userPayload: any){
    return `유저정보: ${JSON.stringify(userPayload)}`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}