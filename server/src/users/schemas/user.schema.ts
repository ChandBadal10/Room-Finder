import { Prop, Schema } from "@nestjs/mongoose";




@Schema({
    timestamps: true
})


export class User {
    @Prop({
        required: true,
        trim: true
    })
    fullName!: string;


    @Prop({
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    })
    email!: string;
}