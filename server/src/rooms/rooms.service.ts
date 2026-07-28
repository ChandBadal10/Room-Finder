import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<RoomDocument>
    ) {}

    // Create Room
    async createRoom(createRoomDto: CreateRoomDto, ownerId: string) {
        try {
            const room = new this.roomModel({
                ...createRoomDto,
                owner: ownerId
            });

            await room.save();

            return {
                success: true,
                message: "Room created successfully",
                room
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }

    //Get All Rooms
    async getAllRooms() {
        try {
        const rooms = await this.roomModel.find().populate("owner", "fullName email phone");

        return {
            success: true,
            message: "Rooms fetched successfully",
            totalRooms: rooms.length,
            rooms
        };

        } catch (error: any) {
            return{
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


    //Get single Room
    async getRoomById(id: string) {
        try {
            const room = await this.roomModel.findById(id).populate("owner", "fullName, phone, profileImage");

            if(!room) {
                throw new BadGatewayException("Room not found")
            }

            return {
                success: true,
                message: "Room fetched successfully",
                room
            }
        } catch(error: any) {
            return{
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


    //Update Room details

    async updateRoom(roomId: string, updateRoomDto: UpdateRoomDto, userId: string) {
        try {
            const room = await this.roomModel.findById(roomId);

            if(!room) {
                throw new BadRequestException("Room not found")
            }

            if(room.owner.toString() !== userId) {
                return {
                    success: false,
                    message: "You are not allowed to update this room"
                };

            }

            const updatedRoom = await this.roomModel.findByIdAndUpdate(roomId, updateRoomDto, {
                new: true
            })

            return {
                success: true,
                message: "Room update successfully",
                room: updatedRoom
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }

    //Delete Room
    async deleteRoom(userId: string, roomId: string) {
        try {
            const room = await this.roomModel.findById(roomId);

            if(!room) {
                return {
                    success: false,
                    message: "Room not found"
                }
            }

            //checking ownership
            if(room.owner.toString() !== userId) {
                return {
                    success: false,
                    message: "You are not allowed to delete this room"
                }
            }

            await this.roomModel.findByIdAndDelete(roomId);

            return {
                success: true,
                message: "Room deleted successfully"
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }
}
