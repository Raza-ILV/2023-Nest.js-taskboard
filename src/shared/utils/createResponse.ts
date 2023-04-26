import { Task } from "src/schemas/TaskSchema"
import { ResponseDTO } from "../dtos/ResponseDTO.dto"
import { Board } from "src/schemas/BoardSchema"

export const createRes = (success:boolean, message:string, payload: Task | Board):ResponseDTO =>  {
    return {
        success: success,
        msg: message,
        payload: payload
    }
}