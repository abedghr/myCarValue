import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { LoggedInUser } from 'src/user/decorators/logged-in.user.decorator';
import { UserDoc } from 'src/user/repositories/entities/user.entity';
import { AuthAdminGuard } from 'src/common/guards/auth.admin.guard';

@Controller("admin/report")
export class ReportAdminController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id/approve")
  async approveReport(
    @LoggedInUser() user: UserDoc,
    @Param('id') id: string
  ) {
    await this.reportService.approve(id, user);
  }

  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id/reject")
  async rejectReport(
    @LoggedInUser() user: UserDoc,
    @Param('id') id: string
  ) {
    await this.reportService.reject(id, user);
  }
}
