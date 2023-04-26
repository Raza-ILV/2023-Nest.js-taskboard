import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Column } from 'src/schemas/ColumnSchema';
import { Task } from 'src/schemas/TaskSchema';
import { TaskService } from '../task/task.service';

@Injectable()
export class ColumnService {
    constructor(
        @InjectModel("Column") private readonly cm:Model<Column>,
        private ts:TaskService
    ){}

    async createColumn(column:Column):Promise<Column>{
        try{
            const newColumn = new this.cm(column)
            return await newColumn.save()
        } catch(err){
            throw new HttpException(
                "Bad POST request at column creation (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async findColumn(id:string):Promise<Column>{
        try{
            return await this.cm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at column fetching (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async updateColumn(id: string, column:Column):Promise<Column>{
        try{
            await this.cm.findByIdAndUpdate(id, column)
            return this.cm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at column updating (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async deleteColumn(id: string):Promise<Column>{
        try{
            const thisColumn:Column = await this.cm.findById(id)
            thisColumn.ColumnTasks.map((item) => {
                this.ts.deleteTask(JSON.parse(JSON.stringify(item)))
            })
            return this.cm.findByIdAndDelete(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at column updating (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async addTask(task:Task, columnId: string):Promise<Column>{
        try{
            const mutColumn = await this.cm.findById(columnId)
            const newTask = await this.ts.createTask(task)
            mutColumn.ColumnTasks.push(newTask)
            await this.cm.findByIdAndUpdate(columnId, mutColumn)
            return await this.cm.findById(columnId)
        }catch(err){
            throw new HttpException(
                "Bad PUT request at task adding (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async removeTask(taskId:string, columnId: string):Promise<Column>{
        try{
            const mutColumn = await this.cm.findById(columnId)
            const deletedTask = await this.ts.deleteTask(taskId)
            mutColumn.ColumnTasks.splice(mutColumn.ColumnTasks.indexOf(deletedTask), 1)
            await this.cm.findByIdAndUpdate(columnId, mutColumn)
            return await this.cm.findById(columnId)
        }catch(err){
            throw new HttpException(
                "Bad PUT request at task adding (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
}
