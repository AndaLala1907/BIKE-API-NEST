import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getUserDashboard(@Req() req: RequestWithUser) {
    const userId = req.user._id.toString();
    return this.dashboardService.getDashboardData(userId);
  }
}
