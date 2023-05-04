import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'src/schemas/BoardSchema';
import { Column, ColumnSchema } from 'src/schemas/ColumnSchema';
import { Task, TaskSchema } from 'src/schemas/TaskSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema }
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService, ColumnService]
})
export class BoardModule {}
