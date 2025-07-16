/**
 * Provides authentication endpoints for registering and logging in users.
 * Delegates core logic to AuthService and returns JWT tokens.
 */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth') // Groups endpoints under "Auth" in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user with name, email, password, etc.
   */
  @Post('register')
  @Public() // No JWT required
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  /**
   * Authenticates a user and returns a JWT token on success.
   * Throws 401 Unauthorized if credentials are invalid.
   */
  @Post('login')
  @Public() // Allow access without authentication
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }
}
