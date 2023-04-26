import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { ColumnSchema } from 'src/schemas/ColumnSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from '../task/task.service';
import { TaskSchema } from 'src/schemas/TaskSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Column", schema: ColumnSchema}]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema}])
  ],
  controllers: [ColumnController],
  providers: [ColumnService, TaskService]
})
export class ColumnModule {}
