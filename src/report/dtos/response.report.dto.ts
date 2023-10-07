import { Expose } from "class-transformer";
import { ResponseBaseSerialize } from '../../common/interceptors/response.base.serialize';

export class ResponseReportDto extends ResponseBaseSerialize {
  
  @Expose()
  readonly user: any;
  
  @Expose()
  readonly price: string;

  readonly make: string;
  
  @Expose()
  readonly model: string;
  
  @Expose()
  readonly year: number;
  
  @Expose()
  readonly lng: number;
  
  @Expose()
  readonly lat: number;
  
  @Expose()
  readonly mileage: number;
  
}
