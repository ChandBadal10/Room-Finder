import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";



export type RoomDocument = HydratedDocument<Room>;


export enum RoomType {
    ROOM = "room",
    FLAT = "flat",
    House = "house"

}


@Schema({
    timestamps: true
})

export class Room {
    @Prop({
        required: true,
        trim: true
    })
    title!: string;

    @Prop({
        required: true,
        trim: true
    })
    description!: string;

    @Prop({
    required: true,
  })
  price!: number;

  @Prop({
    required: true,
  })
  address!: string;

  @Prop({
    required: true,
  })
  city!: string;

  @Prop({
    required: true,
  })
  location!: string;

  @Prop({
    enum: RoomType,
    default: RoomType.ROOM,
  })
  roomType!: RoomType;

  @Prop({
    default: 1,
  })
  bedrooms!: number;

  @Prop({
    default: 1,
  })
  bathrooms!: number;

  @Prop({
    default: 0,
  })
  area!: number;

  @Prop({
    type: [String],
    default: [],
  })
  images!: string[];

  @Prop({
    type: [String],
    default: [],
  })
  amenities!: string[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner!: Types.ObjectId;

  @Prop({
    default: true,
  })
  isAvailable!: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
