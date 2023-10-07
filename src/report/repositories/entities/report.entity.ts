import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Types } from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { ENUM_REPORT_STATUS } from 'src/report/constants/status.enums';
import { User } from 'src/user/repositories/entities/user.entity';

@Schema()
export class Report extends DatabaseMongoObjectIdEntityAbstract {
  @Prop({
    required: true,
    ref: User.name,
    type: Types.ObjectId,
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    default: ENUM_REPORT_STATUS.PENDING,
  })
  status: string;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    required: true,
    type: String,
  })
  make: string;

  @Prop({
    required: true,
    type: String,
  })
  model: string;

  @Prop({
    required: true,
    type: String,
  })
  year: string;

  @Prop({
    required: true,
    type: Number,
  })
  lng: number;

  @Prop({
    required: true,
    type: Number,
  })
  lat: number;

  @Prop({
    required: true,
    type: Number,
  })
  mileage: number;

  @Prop({
    required: false,
    type: Types.ObjectId,
  })
  statusChangedBy?: Types.ObjectId;
  
  @Prop({
    required: false,
    type: Date,
  })
  statusChangedAt?: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
export type ReportDoc = Report & Document;

// Apply the generic plugin to automatically populate the 'user' field
ReportSchema.plugin(
  autoPopulateFields([
    {
      path: "user",
      model: User.name,
      select: '_id name email',
      strictPopulate: false,
    },
  ])
);

ReportSchema.pre("save", function (next: CallbackWithoutResultAndOptionalError) {
  next();
});

ReportSchema.post(
  "save",
  function (doc: ReportDoc, next: CallbackWithoutResultAndOptionalError) {
    next();
  }
);

function autoPopulateFields(fieldsToPopulate: Array<object>) {
  return function (schema) {
    schema.post('save', async function (doc: any) {
      if (doc) {
        await Promise.all(
          fieldsToPopulate.map(async (field) => {
            await doc.populate(field);
          })
        );
      }
    });

    schema.post('find', async function (docs: Array<any>) {
      if (Array.isArray(docs)) {
        await Promise.all(
          docs.map(async (doc) => {
            await Promise.all(
              fieldsToPopulate.map(async (field) => {
                await doc.populate(field).execPopulate();
              })
            );
          })
        );
      }
    });
    
    schema.post('findAll', async function (docs: Array<any>) {
      if (Array.isArray(docs)) {
        await Promise.all(
          docs.map(async (doc) => {
            await Promise.all(
              fieldsToPopulate.map(async (field) => {
                await doc.populate(field).execPopulate();
              })
            );
          })
        );
      }
    });
  };
}