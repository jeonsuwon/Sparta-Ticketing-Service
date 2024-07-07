import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../types/userRole.type';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '핸드폰 번호를 입력해주세요.' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: '주소를 입력해주세요.' })
  address: string;

  @IsEnum(Role, { message: '역할은 USER 또는 ADMIN만 가능합니다.' })
  @IsOptional() // Optional로 지정하여 기본값을 설정할 수 있도록 합니다.
  role: Role = Role.USER;

}