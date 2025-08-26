import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@ApiBearerAuth()
@ApiTags('bikes')
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  /**
   * Get all bikes
   * - Guest → only public
   * - User → only own
   * - Admin → all
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: RequestWithUser) {
    return this.bikesService.findAll(req.user);
  }

  /**
   * Get one bike by ID
   * - Guest → only public
   * - User → only own
   * - Admin → all
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.bikesService.findOne(id, req.user);
  }

  /**
   * Create new bike (only authenticated user or admin)
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateBikeDto, @Req() req: RequestWithUser) {
    return this.bikesService.create(dto, req.user._id.toString());
  }

  /**
   * Update bike
   * - User → only own
   * - Admin → all
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBikeDto,
    @Req() req: RequestWithUser,
  ) {
    return this.bikesService.update(id, dto, req.user);
  }

  /**
   * Delete bike
   * - User → only own
   * - Admin → all
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.bikesService.remove(id, req.user);
  }
}
