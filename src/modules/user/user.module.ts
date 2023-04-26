import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/UserSchema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema}]),
        JwtModule.register({
            secret: `${process.env.BCRYPT_SECRET}`,
            signOptions: {expiresIn: "2h"}
        })
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
