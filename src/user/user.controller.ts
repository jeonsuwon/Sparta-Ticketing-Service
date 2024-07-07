import { UserInfo } from './untils/userinfo.decorator';

import { Body, Controller, Get, Post, UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
    async register(@Body() SignUpDto: SignUpDto) {
    const {email, password, name, phoneNumber, address, role} = SignUpDto
    const data = await this.userService.register(email, password, name, phoneNumber, address, role);
    
    return data
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @Get('check')
  checkUser(@Req() req: any){
    const userPayload = req.user;
    return this.userService.checkUser(userPayload)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}