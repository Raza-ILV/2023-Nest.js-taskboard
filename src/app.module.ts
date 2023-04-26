import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './modules/task/task.module';
import { ColumnModule } from './modules/column/column.module';
import { BoardModule } from './modules/board/board.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TaskModule,
    ColumnModule,
    BoardModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
