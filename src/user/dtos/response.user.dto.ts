import { Expose } from "class-transformer";
import { ResponseBaseSerialize } from '../../common/interceptors/response.base.serialize';

export class ResponseUserDto extends ResponseBaseSerialize {
  
  @Expose()
  readonly name: string;
  
  @Expose()
  readonly email: string;

  @Expose()
  readonly createdAt: Date
  
}
