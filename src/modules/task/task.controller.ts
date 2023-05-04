import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/schemas/TaskSchema';
import { ResponseDTO } from 'src/shared/dtos/ResponseDTO.dto';
import { createRes } from 'src/shared/utils/createResponse';

@Controller('task')
export class TaskController {
    constructor(private taskService:TaskService){}

    @Post()
    async createTask(@Body() task:Task):Promise<ResponseDTO>{
        try{
            return createRes(true, "Task has been created successfully", await this.taskService.createTask(task))
        } catch (err){
            return createRes(false, err.message, null)
        }
    }
    
    @Get(":id")
    async getTaskById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            const fetched:Task = await this.taskService.getTaskById(id)
            if(fetched){
                return createRes(true, "Task has been fetched by id", fetched) 
            } else {
                return createRes(false, "There is no task with that id to get it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch(":id")
    async updateTaskById(@Param("id") id:string, @Body() newTaskData:Task):Promise<ResponseDTO>{
        try{
            const updated:Task = await this.taskService.updateTaskById(id, newTaskData)
            if(updated){
                return createRes(true, "Task has been updated by id", updated) 
            } else {
                return createRes(false, "There is no task with that id to update it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Delete(":id")
    async deleteTaskById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            const deleted:Task = await this.taskService.deleteTaskById(id)
            if(deleted){
               return createRes(true, "Task has been deleted by id", deleted) 
            } else {
                return createRes(false, "There is no task with that id to delete it", deleted)
            } 
        } catch(err){
            return createRes(false, err.message, null)
        }
    }
}
