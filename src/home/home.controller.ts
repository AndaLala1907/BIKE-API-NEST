/**
 * Provides endpoints for both public landing page and authenticated user dashboard.
 */
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { Action } from 'src/common/ability/actions.enum';
import { Public } from 'src/common/decorators/public.decorator';

// Extend Request to include authenticated user info from JWT
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    email: string;
    role: string;
  };
}

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  /**
   * Public endpoint for landing page — no auth required
   */
  @Get('landing')
  @Public()
  getLandingPage() {
    return {
      title: 'Track your ride. Know your journey.',
      subtitle: 'Great app for city commuting!',
      callToAction: 'Log in or Get Started to begin your ride!',
    };
  }

  /**
   * Protected dashboard endpoint for authenticated users
   */
  @Get('overview')
  @UseGuards(PoliciesGuard)
  @ApiBearerAuth('jwt-auth')
  @CheckPolicies((ability) => ability.can(Action.read, 'home'))
  getDashboard(@Req() req: AuthenticatedRequest) {
    return this.homeService.getDashboardOverview(req.user._id);
  }
}
