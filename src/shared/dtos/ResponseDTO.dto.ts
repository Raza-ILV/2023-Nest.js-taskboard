import { Board } from "../../schemas/BoardSchema"
import { Task } from "../../schemas/TaskSchema"

export class ResponseDTO {
    msg: string
    success: boolean
    payload: Task | Board
}