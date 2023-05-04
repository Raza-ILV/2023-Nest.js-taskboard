import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from 'src/schemas/ColumnSchema';
import { Task } from 'src/schemas/TaskSchema';

@Injectable()
export class ColumnService {
    constructor(
        @InjectModel(Column.name) private columnModel: Model<Column>,
        @InjectModel(Task.name) private taskModel: Model<Task>
    ){}

    async createColumn(column:Column):Promise<Column>{
        const createdColumn = new this.columnModel(column);
        return createdColumn.save();
    }

    async getColumnById(id:string):Promise<Column>{
        return this.columnModel.findById(id)
    }

    async updateColumnById(id:string, newColumnData:Column):Promise<Column>{
        await this.columnModel.findByIdAndUpdate(id, newColumnData)
        return this.getColumnById(id)
    }

    async addTaskToColumnById(id:string, task:Task):Promise<Column>{
        const createdTask = new this.taskModel(task)
        createdTask.save()
        const updatedColumn:Column = await this.getColumnById(id)
        updatedColumn.columnTasksId.unshift(createdTask.id)
        updatedColumn.columnTaskCount += 1
        await this.columnModel.findByIdAndUpdate(id, updatedColumn)
        return updatedColumn
    }

    async removeTaskFromColumnById(id:string, taskId:string){
        const oldColumn:Column = await this.getColumnById(id)
        const oldTaskList:string[] = oldColumn.columnTasksId
        const newTaskList:string[] = oldTaskList.filter(taskItem => taskItem !== taskId)
        await this.taskModel.findByIdAndDelete(taskId)
        oldColumn.columnTaskCount -= 1
        oldColumn.columnTasksId = newTaskList
        const updatedColumn = oldColumn
        await this.columnModel.findByIdAndUpdate(id, updatedColumn)
        return this.getColumnById(id)
    }

    async deleteColumnById(id:string):Promise<Column>{
        const columnTaskList:string[] = (await this.getColumnById(id)).columnTasksId
        columnTaskList.map(async (item:string) => {
            await this.taskModel.findByIdAndDelete(item)
        })
        return this.columnModel.findByIdAndDelete(id)
    }
}
