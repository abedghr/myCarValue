import { BadRequestException, Injectable } from "@nestjs/common";
import { ReportRepository } from "../repositories/report.repository";
import { CreateReportDto } from "../dtos/create.report.dto";
import { ReportDoc } from "../repositories/entities/report.entity";
import { UserDoc } from "src/user/repositories/entities/user.entity";
import { ENUM_REPORT_STATUS } from "../constants/status.enums";
import { Types } from "mongoose";

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async create(report: CreateReportDto, user: UserDoc): Promise<ReportDoc> {
    try {
      report.user = user._id;
      return await this.reportRepository.create(report);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  async approve(id: string, user: UserDoc): Promise<void> {
    try {
      const updatedRecord: object = {
        status: ENUM_REPORT_STATUS.APPROVED,
        statusChangedBy: user._id,
        statusChangedAt: new Date()
      }
      
      await this.reportRepository.updateOne({ _id: new Types.ObjectId(id) }, updatedRecord);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  async reject(id: string, user: UserDoc): Promise<void> {
    try {
      const updatedRecord: object = {
        status: ENUM_REPORT_STATUS.REJECT,
        statusChangedBy: user._id,
        statusChangedAt: new Date()
      }
      
      await this.reportRepository.updateOne({ _id: new Types.ObjectId(id) }, updatedRecord);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
