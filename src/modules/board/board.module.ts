import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnSchema } from 'src/schemas/ColumnSchema';
import { BoardSchema } from 'src/schemas/BoardSchema';
import { TaskService } from '../task/task.service';
import { TaskSchema } from 'src/schemas/TaskSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Board", schema: BoardSchema}]),
    MongooseModule.forFeature([{ name: "Column", schema: ColumnSchema}]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema}])
  ],
  controllers: [BoardController],
  providers: [BoardService, ColumnService, TaskService]
})
export class BoardModule {}
