import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: "PR6Boards" })
export class Board {

    @Prop({ required: true })
    boardName: string

    @Prop({ required: true })
    boardDescription: string

    @Prop({ required: true })
    boardBackground: number

    @Prop({ required: true })
    boardCreator: string

    @Prop({ required: true })
    boardCollaboratorsId: string[]

    @Prop({ required: true, default: 1 })
    boardCollaboratorsCount: number

    @Prop({ required: true, default: [] })
    boardColumnsId: string[]

    @Prop({ required: true, default: 0 })
    boardColumnsCount: number
}
export const BoardSchema = SchemaFactory.createForClass(Board);
