import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: "PR6Columns" })
export class Column {

    @Prop({ required: true })
    columnName: string

    @Prop({ required: true })
    columnDescription: string

    @Prop({ required: true, default: 0 })
    columnColor: number

    @Prop({ required: true, default: 0 })
    columnTaskCount: number

    @Prop({ required: true, default: [] })
    columnTasksId: string[]

}
export const ColumnSchema = SchemaFactory.createForClass(Column);