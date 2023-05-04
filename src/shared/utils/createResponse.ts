import { Task } from "src/schemas/TaskSchema"
import { ResponseDTO } from "../dtos/ResponseDTO.dto"
import { Board } from "src/schemas/BoardSchema"
import { Column } from "src/schemas/ColumnSchema"

export const createRes = (success:boolean, message:string, payload: Task | Column | Board):ResponseDTO =>  {
    return {
        success: success,
        msg: message,
        payload: payload
    }
}