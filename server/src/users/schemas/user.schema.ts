import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  SEEKER = 'seeker',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  fullName!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    required: true,
  })
  phone!: string;

  @Prop({
    enum: UserRole,
    default: UserRole.SEEKER,
  })
  role!: UserRole;

  @Prop({
    default: '',
  })
  profileImage!: string;

  @Prop({
    default: '',
  })
  address!: string;

  @Prop({
    default: '',
  })
  gender!: string;

  @Prop({
    default: false,
  })
  isVerified!: boolean;

  @Prop({
    default: false,
  })
  isBlocked!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);