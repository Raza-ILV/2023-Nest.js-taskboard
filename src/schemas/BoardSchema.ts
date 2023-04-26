import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Column } from './ColumnSchema';


@Schema({ collection: "PR6Boards" })
export class Board {
    @Prop({ required: true, default: 0 })
    BoardBackground: number

    @Prop({ required: true, default: "New board"})
    BoardName: string

    @Prop({ required: true, default: "Description..."})
    BoardDescr: string

    @Prop({ required: true, default: false})
    HasChat: boolean

    @Prop({ required: true, default: false})
    BoardChat: [string]

    @Prop({ required: true })
    BoardCollaborators: [string]

    @Prop({ type: [Types.ObjectId], ref: Column.name, required: true, default: []})
    BoardColumns: Column[]    

    @Prop({ required: true })
    BoardCreator: string    
}
export const BoardSchema = SchemaFactory.createForClass(Board);