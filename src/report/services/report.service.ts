import { BadRequestException, Injectable } from "@nestjs/common";
import { ReportRepository } from "../repositories/report.repository";
import { CreateReportDto } from "../dtos/create.report.dto";
import { ReportDoc } from "../repositories/entities/report.entity";
import { UserDoc } from "src/user/repositories/entities/user.entity";
import { ENUM_REPORT_STATUS } from "../constants/status.enums";
import { Aggregate, PipelineStage, Types } from "mongoose";
import { GetVehicleEstimateDto } from "../dtos/get.vehicle.estimate.dto";

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async list(): Promise<ReportDoc[]> {
    try {
      return await this.reportRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
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
        statusChangedAt: new Date(),
      };

      await this.reportRepository.updateOne(
        { _id: new Types.ObjectId(id) },
        updatedRecord
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async reject(id: string, user: UserDoc): Promise<void> {
    try {
      const updatedRecord: object = {
        status: ENUM_REPORT_STATUS.REJECT,
        statusChangedBy: user._id,
        statusChangedAt: new Date(),
      };

      await this.reportRepository.updateOne(
        { _id: new Types.ObjectId(id) },
        updatedRecord
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVehicleEstimate(
    query: GetVehicleEstimateDto
  ): Promise<Aggregate<Array<object>>> {
    try {
      const vehicleEstimatePipeLines: Array<PipelineStage> = [
        {
          $match: {
            make: query.make,
            model: query.model,
            status: ENUM_REPORT_STATUS.APPROVED,
            lng: { $gte: query.lng - 5, $lte: query.lng + 5 },
            lat: { $gte: query.lat - 5, $lte: query.lat + 5 },
            year: { $gte: query.year - 3, $lte: query.year + 3 },
          },
        },
        {
          $addFields: {
            differenceMileage: {
              $abs: { $subtract: ["$mileage", query.mileage] },
            },
          },
        },
        {
          $sort: {
            differenceMileage: -1,
          },
        },
        {
          $limit: 3,
        },
        {
          $group: {
            _id: null,
            averagePrice: { $avg: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            averagePrice: { $round: ["$averagePrice", 2] },
          },
        },
      ];

      return await this.reportRepository.aggregate(vehicleEstimatePipeLines);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
