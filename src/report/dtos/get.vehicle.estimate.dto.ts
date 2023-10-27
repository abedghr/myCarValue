import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class GetVehicleEstimateDto {
  
  @IsString()
  @IsNotEmpty()
  readonly make: string;
  
  @IsString()
  @IsNotEmpty()
  readonly model: string;
  
  @IsNotEmpty()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  readonly year: number;
  
  @IsNotEmpty()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  readonly lng: number;
  
  @IsNotEmpty()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  readonly lat: number;
  
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  readonly mileage: number;
  
}
