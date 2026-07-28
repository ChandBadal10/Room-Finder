import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { CreateRoomDto } from './dto/create-room.dto';

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

    @Get(":id")
    getRoomId(
        @Param("id") id: string
    ) {
        return this.roomService.getRoomById(id);
    }
}
