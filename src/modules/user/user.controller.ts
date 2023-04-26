import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { User } from 'src/schemas/UserSchema';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly us: UserService){}

    @Post("local/reg")
    async createUserLocaly(@Body() user: User){
        try{
            return this.us.createUser(user)
        } catch(err){
            throw new HttpException(
                "Bad POST request at user creation (Controller)", 
                HttpStatus.BAD_REQUEST
            );
        }
    }
    @Post("local/auth")
    async authUserLocaly(
        @Body("UserEmail") email:string, 
        @Body("UserPassword") pass: string,
        @Res({passthrough: true}) res: Response
    ){
        try{
            res.cookie("jwt", await this.us.authUser(email, pass), {httpOnly: true})
            return {msg: "Logged in"}
        } catch(err){
            throw new HttpException(
                "Bad POST request at user authentication (Controller)", 
                HttpStatus.BAD_REQUEST
            );
        }   
    }
    @Get("local/profile")
    async user(@Req() req: Request){
        const cookie = req.cookies["jwt"]
        return this.us.userProfile(cookie)
    }
    @Post("local/logout")
    async logout(@Res({passthrough: true}) res: Response){
        res.clearCookie("jwt")
        return {msg: "Logged out"}
    }
}
