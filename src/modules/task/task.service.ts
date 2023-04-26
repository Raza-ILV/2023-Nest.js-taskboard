import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/TaskSchema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>
    ){}

    async createTask(task:Task):Promise<Task>{
        const createdTask = new this.taskModel(task);
        return createdTask.save();
    }

    async getTaskById(id:string):Promise<Task>{
        return this.taskModel.findById(id)
    }

    async updateTaskById(id:string, newTaskData:Task):Promise<Task>{
        await this.taskModel.findByIdAndUpdate(id, newTaskData,)
        return this.getTaskById(id)
    }

    async deleteTaskById(id:string):Promise<Task>{
        return this.taskModel.findByIdAndDelete(id)
    }
}
