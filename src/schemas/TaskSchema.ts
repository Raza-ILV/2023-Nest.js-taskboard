import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: "PR6Tasks" })
export class Task {

    @Prop({ required: true })
    taskName: string

    @Prop({ required: true })
    taskDescription: string

    @Prop({ required: true })
    taskAuthor: string

    @Prop({ required: true })
    taskColumn: string

}
export const TaskSchema = SchemaFactory.createForClass(Task);
