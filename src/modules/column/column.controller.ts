import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Column } from 'src/schemas/ColumnSchema';
import { Task } from 'src/schemas/TaskSchema';

@Controller('column')
export class ColumnController {
    constructor(private readonly cs: ColumnService){}

    @Post()
    @HttpCode(201)
    createColumn(@Body() task: Column):Promise<Column>{
        try{
            return this.cs.createColumn(task)
        } catch(err){
            throw new HttpException(
                "Bad POST request at task creation (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
    }

    @Get(":id")
    @HttpCode(200)
    getColumn(@Param("id") id):Promise<Column>{
        try{
            return this.cs.findColumn(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at task fetching (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }

    @Put(":id")
    @HttpCode(200)
    updateColumn(@Param("id") id, @Body() task: Column):Promise<Column>{
        try{
            return this.cs.updateColumn(id, task)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at task updating (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }

    @Delete(":id")
    @HttpCode(200)
    removeColumn(@Param("id") id:string):Promise<Column>{
        try{
            return this.cs.deleteColumn(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at task deleting (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }

    @Put("add-task/:id")
    @HttpCode(200)
    addTask(@Body() task: Task, @Param("id") columnId: string):Promise<Column>{
        return this.cs.addTask(task, columnId)
    }

    @Put("remove-task/:id")
    @HttpCode(200)
    delTask(@Body("TaskId") taskId: string, @Param("id") columnId: string):Promise<Column>{
        return this.cs.removeTask(taskId, columnId)
    }
}
