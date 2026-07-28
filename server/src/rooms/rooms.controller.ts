import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SearchRoomDto } from './dto/search-room.dto';

@Controller('rooms')
export class RoomsController {
    constructor(
        private readonly roomService: RoomsService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.OWNER)
    @Post()
    createRoom(
        @Body() createRoomDto: CreateRoomDto,
        @Req() request: any,
    ) {
        return this.roomService.createRoom(
            createRoomDto,
            request.user.id
        )
    }

    @Get()
    getAllRooms() {
        return this.roomService.getAllRooms();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.OWNER)
    @Get("my-rooms")
    getMyRooms(
        @Req() request: any,
    ) {
        return this.roomService.getMyRooms(
            request.user.id
        )
    }

        @Get("search")
    searchRooms(
        @Query() searchRoomDto: SearchRoomDto,
    ) {
        return this.roomService.searchRooms(
            searchRoomDto
        )
    }

    @Get(":id")
    getRoomId(
        @Param("id") id: string
    ) {
        return this.roomService.getRoomById(id);
    }


    //Update Room
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.OWNER)
    @Put(":id")
    updateRoom(
        @Param("id") id: string,
        @Body() updateRoomDto: UpdateRoomDto,
        @Req() request: any
    ) {
        return this.roomService.updateRoom(
            id,
            updateRoomDto,
            request.user.id
        )
    }


    //Delete Room
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.OWNER)
    @Delete(":id")
    deleteRoom(
        @Param("id") id: string,
        @Req() request: any,
    ) {
        return this.roomService.deleteRoom(
            request.user.id,
            id
        )
    }



}
