import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/schemas/TaskSchema';
import { ResponseDTO } from 'src/shared/dtos/ResponseDTO.dto';
import { createRes } from 'src/shared/utils/createResponse';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post()
    async createTask(@Body() task:Task):Promise<ResponseDTO>{
        try{
            return createRes(true, "Task has been created successfully", await this.taskService.createTask(task))
        } catch (err){
            return  createRes(false, err.message, null)
        }
    }
    
    @Get(":id")
    async getTaskById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            return createRes(true, "Task has been fetched by id", await this.taskService.getTaskById(id))
        } catch(err){
            return  createRes(false, err.message, null)
        }
    }

    @Put(":id")
    async updateTaskById(@Param("id") id:string, @Body() newTaskData:Task):Promise<ResponseDTO>{
        try{
            return createRes(true, "Task has been updated by id", await this.taskService.updateTaskById(id, newTaskData))
        } catch(err){
            return  createRes(false, err.message, null)
        }
    }

    @Delete(":id")
    async deleteTaskById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            return createRes(true, "Task has been deleted by id", await this.taskService.deleteTaskById(id))
        } catch(err){
            return  createRes(false, err.message, null)
        }
    }
}
