import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';




@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}


    async create(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto);
        return user;
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({email});
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }

    async findAll() {
        return await this.userModel.find();
    }

}
