import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/schemas/TaskSchema';

@Controller('task')
export class TaskController {
    constructor(private readonly ts: TaskService){}

    @Post()
    @HttpCode(201)
    createTask(@Body() task: Task):Promise<Task>{
        try{
            return this.ts.createTask(task)
        } catch(err){
            throw new HttpException(
                "Bad POST request at task creation (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
    }

    @Get(":id")
    @HttpCode(200)
    getTask(@Param("id") id):Promise<Task>{
        try{
            return this.ts.findTask(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at task fetching (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }

    @Put(":id")
    @HttpCode(200)
    updateTask(@Param("id") id, @Body() task: Task):Promise<Task>{
        try{
            return this.ts.updateTask(id, task)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at task updating (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }

    @Delete(":id")
    @HttpCode(200)
    removeTask(@Param("id") id):Promise<Task>{
        try{
            return this.ts.deleteTask(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at task deleting (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }
}
