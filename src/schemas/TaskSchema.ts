import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true, collection: "PR6Tasks" })
export class Task {

    @Prop({ required: true, default: "There is no task name yet..." })
    TaskName: string

    @Prop({ required: true, default: "There is no description yet..." })
    TaskDescr: string
}
export const TaskSchema = SchemaFactory.createForClass(Task);