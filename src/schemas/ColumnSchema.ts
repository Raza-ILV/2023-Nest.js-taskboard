import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Task } from './TaskSchema';


@Schema({ collection: "PR6Columns" })
export class Column {
    @Prop({ required: true, default: "#DEDEDE" })
    ColumnColor: string

    @Prop({ required: true, default: "New column"})
    ColumnName: string

    @Prop({ required: true, default: "Description..."})
    ColumnDescr: string

    @Prop({ type: [Types.ObjectId], ref: Task.name, required: true, default: []})
    ColumnTasks: Task[]
}
export const ColumnSchema = SchemaFactory.createForClass(Column);