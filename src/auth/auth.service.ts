import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt'
import { Role } from '../../generated/prisma/enums';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from './config/config_jwt';
// import { UpdateAuthDto } from './dto/update-auth.dto.ts';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
  }
  async register(data: RegisterDto) {
    const findEmail = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      }
    })
    if (findEmail) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await hash(data.password, 12);
    const createdUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: Role.USER,
      },
    });
    return {
      message: 'User created successfully',
      user: createdUser
    }
  }

  async loginUser(data: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      }
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const checkPassword = await compare(data.password, user.password)
    if (!checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (checkPassword) {
      const token = this.generateToken({
        sub: user.id,
        name: user.name,
        email: user.email,
        roles: [user.role],
      });
      return {
        message: 'Login successfully',
        token: token
      }
    }
  }

  async logoutUser() {
    return {
      message: 'Logout successfully'
    }
  }

  generateToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expired,
    });
  }
}
