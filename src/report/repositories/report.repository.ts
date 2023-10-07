import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportRepositoryInterface} from '../interfaces/report.repository.interface';
import { CreateReportDto } from '../dtos/create.report.dto';
import { Report, ReportDoc } from './entities/report.entity';

@Injectable()
export class ReportRepository implements ReportRepositoryInterface {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDoc>,
  ) {}

  async create(report: CreateReportDto): Promise<ReportDoc> {
    const reportRepository = new this.reportModel(report);
    return (await reportRepository.save());
  }
  
  async updateOne(filter: object, updateRecords:object): Promise<any> {
    return await this.reportModel.updateOne(filter, updateRecords);
  }
}
