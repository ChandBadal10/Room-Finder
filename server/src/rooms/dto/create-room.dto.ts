import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { RoomType } from '../schemas/room.schema';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsEnum(RoomType)
  roomType!: RoomType;

  @IsNumber()
  bedrooms!: number;

  @IsNumber()
  bathrooms!: number;

  @IsNumber()
  area!: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  amenities?: string[];
}