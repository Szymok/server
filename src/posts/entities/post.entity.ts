import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, Length, IsString } from "class-validator";

@Schema()
export class Post {

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    @ApiProperty({ required: true, minLength: 1, maxLength: 100 })
    @Prop({required: true, minLength: 2, maxLength: 50})
    title: string;

    @Length(1, 1000)
    @IsString()
    @ApiProperty({ required: false, minLength: 1, maxLength: 255 })
    @Prop({required: true, minLength: 2, maxLength: 500})
    content: string;

    @IsDate()
    @ApiProperty({ required: false, example: ["2021-01-01T00:00:00.000Z", null], })
    @Prop({required: true, default: Date.now})
    createdAt: Date;

    @ApiProperty({ required: false, example: ["2021-01-01T00:00:00.000Z", null], })
    @IsDate()
    @Prop({required: false, default: null})
    updatedAt: Date;
    
    @ApiProperty({ required: false, example: ["2021-01-01T00:00:00.000Z", null], })
    @IsDate()
    @Prop({required: false, default: null})
    deletedAt: Date;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);