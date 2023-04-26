import { Controller, Post, Get, Put, Delete, HttpCode, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from 'src/schemas/BoardSchema';
import { Column } from 'src/schemas/ColumnSchema';

@Controller('board')
export class BoardController {
    constructor(private readonly bs: BoardService){}
    @Post()
    @HttpCode(201)
    createColumn(@Body() board: Board):Promise<Board>{
        try{
            return this.bs.createBoard(board)
        } catch(err){
            throw new HttpException(
                "Bad POST request at board creation (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
    }
    @Get(":id")
    @HttpCode(200)
    getColumn(@Param("id") id):Promise<Board>{
        try{
            return this.bs.findBoard(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at task fetching (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }
    @Put(":id")
    @HttpCode(200)
    updateColumn(@Param("id") id, @Body() board: Board):Promise<Board>{
        try{
            return this.bs.updateBoard(id, board)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at task updating (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }
    @Delete(":id")
    @HttpCode(200)
    removeColumn(@Param("id") id):Promise<Board>{
        try{
            return this.bs.deleteBoard(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at task deleting (Controller)", 
                HttpStatus.BAD_REQUEST 
            )
        }
        
    }
    @Put("add-column/:id")
    @HttpCode(200)
    addColumn(@Body() column: Column, @Param("id") boardId: string):Promise<Board>{
        return this.bs.addColumn(column, boardId)
    }
    @Put("remove-column/:id")
    @HttpCode(200)
    delTask(@Body("ColumnId") columnId: string, @Param("id") boardId: string):Promise<Board>{
        return this.bs.removeColumn(columnId, boardId)
    }
}