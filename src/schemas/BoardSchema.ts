import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: "PR6Board" })
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

    @Prop({ required: true })
    boardColumnsId: string[]
}
export const BoardSchema = SchemaFactory.createForClass(Board);
