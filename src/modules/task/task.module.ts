import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskSchema } from 'src/schemas/TaskSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Task", schema: TaskSchema}])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
