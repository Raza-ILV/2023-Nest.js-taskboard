import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Column } from 'src/schemas/ColumnSchema';
import { ResponseDTO } from 'src/shared/dtos/ResponseDTO.dto';
import { ColumnService } from './column.service';
import { createRes } from 'src/shared/utils/createResponse';
import { Task } from 'src/schemas/TaskSchema';

@Controller('column')
export class ColumnController {
    constructor(private columnService:ColumnService){}

    @Post()
    async createColumn(@Body() column:Column):Promise<ResponseDTO>{
        try{
            return createRes(true, "Column has been created successfully", await this.columnService.createColumn(column))
        } catch (err){
            return createRes(false, err.message, null)
        }
    }

    @Get(":id")
    async getColumnById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            const fetched:Column = await this.columnService.getColumnById(id)
            if(fetched){
                return createRes(true, "Column has been fetched by id", fetched) 
            } else {
                return createRes(false, "There is no column with that id to get it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch(":id")
    async updateColumnById(@Param("id") id:string, @Body() newColumnData:Column):Promise<ResponseDTO>{
        try{
            const updated:Column = await this.columnService.updateColumnById(id, newColumnData)
            if(updated){
                return createRes(true, "Column has been updated by id", updated) 
            } else {
                return createRes(false, "There is no column with that id to update it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch("add-task/:id")
    async addTaskToColumnById(@Param("id") id:string, @Body() task:Task):Promise<ResponseDTO>{
        try{
            const updated:Column = await this.columnService.addTaskToColumnById(id, task)
            if(updated){
                return createRes(true, "Task has been successfully added to column by id", updated) 
            } else {
                return createRes(false, "There is no column with that id to add task to it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }
    
    @Patch("remove-task/:id")
    async removeTaskFromColumnById(@Param("id") id:string, @Body("taskId") taskId:string):Promise<ResponseDTO>{
        try{
            const updated:Column = await this.columnService.removeTaskFromColumnById(id, taskId)         
            if(updated){
                return createRes(true, "Task has been successfully removed from column by id", updated) 
            } else {
                return createRes(false, "There is no column with that id to remove task from it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        } 
    }

    @Delete(":id")
    async removeColumnById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            const deleted:Column = await this.columnService.deleteColumnById(id)
            if(deleted){
               return createRes(true, "Column has been deleted by id", deleted) 
            } else {
                return createRes(false, "There is no column with that id to delete it", deleted)
            } 
        } catch(err){
            return createRes(false, err.message, null)
        } 
    }
}
