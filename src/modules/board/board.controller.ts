import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from 'src/schemas/BoardSchema';
import { ResponseDTO } from 'src/shared/dtos/ResponseDTO.dto';
import { createRes } from 'src/shared/utils/createResponse';
import { Column } from 'src/schemas/ColumnSchema';

@Controller('board')
export class BoardController {
    constructor(private boardService:BoardService ){}

    @Post()
    async createBoard(@Body() board:Board):Promise<ResponseDTO>{
        try{
            return createRes(true, "Board has been created successfully", await this.boardService.createBoard(board))
        } catch (err){
            return createRes(false, err.message, null)
        }
    }

    @Post("send-invite")
    async sendInviteToBoardByEmail(@Body("email") email:string):Promise<ResponseDTO>{
        return createRes(false, "Upcoming feature", null)
    }
    
    @Get(":id")
    async getBoardById(@Param("id") id:string):Promise<ResponseDTO>{
        try{
            const fetched:Board = await this.boardService.getBoardById(id)
            if(fetched){
                return createRes(true, "Board has been fetched by id", fetched) 
            } else {
                return createRes(false, "There is no board with that id to get it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch(":id")
    async updateColumnById(@Param("id") id:string, @Body() newBoardData:Board):Promise<ResponseDTO>{
        try{
            const updated:Board = await this.boardService.updateBoardById(id, newBoardData)
            if(updated){
                return createRes(true, "Board has been updated by id", updated) 
            } else {
                return createRes(false, "There is no board with that id to update it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch("add-column/:id")
    async addColumnToBoardById(@Param("id") id:string, @Body() column:Column):Promise<ResponseDTO>{
        try{
            const updated:Board = await this.boardService.addColumnToBoardById(id, column)
            if(updated){
                return createRes(true, "Column has been successfully added to board by id", updated) 
            } else {
                return createRes(false, "There is no Board with that id to add column to it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        }
    }

    @Patch("remove-column/:id")
    async removeColumnFromBoardById(@Param("id") id:string, @Body("columnId") columnId:string):Promise<ResponseDTO>{
        try{
            const updated:Board = await this.boardService.removeColumnFromBoardById(id, columnId)         
            if(updated){
                return createRes(true, "Column has been successfully removed from board by id", updated) 
            } else {
                return createRes(false, "There is no boad with that id to remove column from it", null)
            }
        } catch(err){
            return createRes(false, err.message, null)
        } 
    }


}
