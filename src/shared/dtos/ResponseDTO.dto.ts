import { Column } from "src/schemas/ColumnSchema"
import { Board } from "../../schemas/BoardSchema"
import { Task } from "../../schemas/TaskSchema"

export class ResponseDTO {
    msg: string
    success: boolean
    payload: Task | Column | Board
}