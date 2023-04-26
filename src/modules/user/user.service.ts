import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/UserSchema';
import { decodePassword, encodePassword } from 'src/shared/bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel("User") private readonly um:Model<User>,
        private jwtService: JwtService
    ){}

    async createUser(user:User):Promise<User>{
        try{
            if(!await this.um.findOne({UserEmail: user.UserEmail})){
                const mutatedUser = {...user, UserPassword: await encodePassword(user.UserPassword)}
                const newUser = new this.um(mutatedUser)
                return await newUser.save()
            } else {
                throw new HttpException(
                    "Bad POST request at user creation. User already exists (Service)", 
                    HttpStatus.FORBIDDEN
                );
            }
        } catch(err){
            throw new HttpException(
                "Bad POST request at user creation (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async authUser(email:string, password:string):Promise<string>{
        try{        
            const user = await this.um.findOne({ UserEmail: email})
            const jwt = await this.jwtService.signAsync({id: user.UserEmail})
            if(await decodePassword(password, user.UserPassword)){
                return jwt
            } else {
                throw new HttpException(
                    "Bad POST request at user auth. Password wrong (Service)", 
                    HttpStatus.BAD_REQUEST
                )
            }
        } catch(err){
            throw new HttpException(
                "Bad POST request at user auth (Service)", 
                HttpStatus.BAD_REQUEST
            )
        } 
    }
    async userProfile(cookie:string){
        try{
            const data = await this.jwtService.verifyAsync(cookie)
            const user = await this.um.findOne({UserEmail: data.id})
            return user
        } catch(err){
            throw new HttpException(
                "Bad POST request at user profile fetch (Service)", 
                HttpStatus.FORBIDDEN
            )
        }
    }
}
