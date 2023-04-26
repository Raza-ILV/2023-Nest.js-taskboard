import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Board } from './BoardSchema';


@Schema({ collection: "PR6Users" })
export class User {
    @Prop({ required: true})
    UserStrategy: string

    @Prop({ required: true})
    UserName: string

    @Prop({ required: true, default: "https://yt3.googleusercontent.com/ytc/AGIKgqOLaZ73mu7dXrCrI0uyoZaF0HCiOi2QyU0PO26M=s176-c-k-c0x00ffffff-no-rj"})
    UserImage: string

    @Prop({ required: true, unique: true })
    UserEmail: string

    @Prop({ required: true})
    UserPassword: string

    @Prop({ type: [Types.ObjectId], ref: Board.name, required: true, default: []})
    UserBoards: Board
}
export const UserSchema = SchemaFactory.createForClass(User);