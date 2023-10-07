import { IsLatitude, IsLongitude, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min, isMongoId } from "class-validator";
import { Types, isValidObjectId } from "mongoose";

export class CreateReportDto {
  
  user: Types.ObjectId;
  
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  
  @IsString()
  @IsNotEmpty()
  readonly make: string;
  
  @IsString()
  @IsNotEmpty()
  readonly model: string;
  
  @IsNumber()
  @IsNotEmpty()
  @Min(1930)
  @Max(2050)
  readonly year: number;
  
  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
  readonly lng: number;
  
  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  readonly lat: number;
  
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  readonly mileage: number;
  
}
