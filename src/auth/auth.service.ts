/**
 * Handles registration, login, and user validation logic.
 * Utilizes bcrypt for password hashing and JWT for token generation.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * Registers a new user after checking for duplicate email.
   * Hashes the password before saving.
   */
  async register(registerDto: RegisterDto) {
    const { email, password, ...rest } = registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      ...rest,
      email,
      password: hashedPassword,
    });

    return await user.save();
  }

  /**
   * Validates a user by comparing email and password.
   * Returns the user document on success, or null on failure.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Authenticates the user and returns a signed JWT token.
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDoc = user as UserDocument;

    return {
      access_token: this.jwtService.sign({
        sub: userDoc._id.toString(),
        email: userDoc.email,
        role: userDoc.role,
      }),
    };
  }
}
