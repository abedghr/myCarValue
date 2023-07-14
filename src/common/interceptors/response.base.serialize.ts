import { Expose } from "class-transformer";

export class ResponseBaseSerialize {

    @Expose()
    readonly _id: string;

    @Expose()
    readonly createdAt: Date;
}