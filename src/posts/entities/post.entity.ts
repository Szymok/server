import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Post {
    @ApiProperty({ required: true, minLength: 1, maxLength: 100 })
    @Prop({required: true, minLength: 2, maxLength: 50})
    title: string;

    @ApiProperty({ required: false, minLength: 1, maxLength: 255 })
    @Prop({required: true, minLength: 2, maxLength: 500})
    content: string;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);