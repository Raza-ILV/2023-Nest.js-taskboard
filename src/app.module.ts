import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalModule } from './modules/global/global.module';
import { TaskModule } from './modules/task/task.module';
import { Task, TaskSchema } from './schemas/TaskSchema';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    GlobalModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
