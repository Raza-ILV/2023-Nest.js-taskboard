import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from 'src/schemas/ColumnSchema';
import { Task, TaskSchema } from 'src/schemas/TaskSchema';
import { TaskService } from '../task/task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema }
    ])
  ],
  controllers: [ColumnController],
  providers: [ColumnService]
})
export class ColumnModule {}
