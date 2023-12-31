import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { ENUM_USER_TYPES } from 'src/user/constants/types.enums';

@Schema()
export class User extends DatabaseMongoObjectIdEntityAbstract {
  @Prop({
    required: true,
    type: String,
    default: ENUM_USER_TYPES.USER
  })
  type: ENUM_USER_TYPES;
  
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDoc = User & Document;

UserSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  next();
});

UserSchema.post(
  'save',
  function (doc: UserDoc, next: CallbackWithoutResultAndOptionalError) {
    console.log(`data saved with _id = ${this._id}`);
    
      next();
  }
);