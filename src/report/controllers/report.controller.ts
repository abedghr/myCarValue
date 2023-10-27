import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from '../dtos/create.report.dto';
import { ReportService } from '../services/report.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LoggedInUser } from 'src/user/decorators/logged-in.user.decorator';
import { UserDoc } from 'src/user/repositories/entities/user.entity';
import { GetVehicleEstimateDto } from '../dtos/get.vehicle.estimate.dto';

@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard)
  // @Serialize(ResponseReportDto)
  @Post()
  async createReport(
    @LoggedInUser() user: UserDoc,
    @Body() body: CreateReportDto
  ) {
    return await this.reportService.create(body, user);
  }
  
  @UseGuards(AuthGuard)
  // @Serialize(ResponseReportDto)
  @Get('/get-vehicle-estimate')
  async getVehicleEstimate(
    @LoggedInUser() user: UserDoc,
    @Query() query: GetVehicleEstimateDto
  ) {
    return await this.reportService.getVehicleEstimate(query);
  }
}
