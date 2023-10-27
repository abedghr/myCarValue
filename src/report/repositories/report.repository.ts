import { Injectable } from '@nestjs/common';
import { Aggregate, AggregateOptions, Model, PipelineStage } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportRepositoryInterface} from '../interfaces/report.repository.interface';
import { CreateReportDto } from '../dtos/create.report.dto';
import { Report, ReportDoc } from './entities/report.entity';

@Injectable()
export class ReportRepository implements ReportRepositoryInterface {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDoc>
  ) {}

  async findAll(): Promise<ReportDoc[]> {
    return await this.reportModel.find().sort({status: -1});
  }
  
  async create(report: CreateReportDto): Promise<ReportDoc> {
    const reportRepository = new this.reportModel(report);
    return await reportRepository.save();
  }

  async updateOne(filter: object, updateRecords: object): Promise<any> {
    return await this.reportModel.updateOne(filter, updateRecords);
  }

  async aggregate(
    pipelines: Array<PipelineStage>,
    options?: AggregateOptions
  ): Promise<Aggregate<Array<object>>> {
    return await this.reportModel.aggregate(pipelines, options);
  }
}
