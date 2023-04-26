import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/TaskSchema';

@Injectable()
export class TaskService {
    constructor(@InjectModel("Task") private readonly tm:Model<Task>){}

    async createTask(task:Task):Promise<Task>{
        try{
            const newTask = new this.tm(task)
            return await newTask.save()
        } catch(err){
            throw new HttpException(
                "Bad POST request at task creation (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async findTask(id:string):Promise<Task>{
        try{
            return await this.tm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at task fetching (Service)", 
                HttpStatus.FORBIDDEN
            )
        }
    }
    async updateTask(id:string, task:Task):Promise<Task>{
        try{
            await this.tm.findByIdAndUpdate(id, task)
            return this.tm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at task updating (Service)", 
                HttpStatus.FORBIDDEN
            )
        }
    }
    async deleteTask(id:string):Promise<Task>{
        try{
            return await this.tm.findByIdAndDelete(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at task deleting (Service)", 
                HttpStatus.FORBIDDEN
            )
        }
    }
}
