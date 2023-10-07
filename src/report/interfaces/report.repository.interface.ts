
import { CreateReportDto } from '../dtos/create.report.dto';
import { ReportDoc } from '../repositories/entities/report.entity';

export interface ReportRepositoryInterface {
  create(user: CreateReportDto): Promise<ReportDoc>;
}