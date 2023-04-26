import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from 'src/schemas/BoardSchema';
import { ColumnService } from '../column/column.service';
import { Column } from 'src/schemas/ColumnSchema';

@Injectable()
export class BoardService {
    constructor(
        @InjectModel("Board") private readonly bm:Model<Board>,
        private cs:ColumnService
    ){}

    async createBoard(board:Board):Promise<Board>{
        try{
            const newBoard = new this.bm(board)
            return await newBoard.save()
        } catch(err){
            throw new HttpException(
                "Bad POST request at column creation (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async findBoard(id:string):Promise<Board>{
        try{
            return await this.bm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad GET request at board fetching (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async updateBoard(id: string, board:Board):Promise<Board>{
        try{
            await this.bm.findByIdAndUpdate(id, board)
            return this.bm.findById(id)
        } catch(err){
            throw new HttpException(
                "Bad PUT request at board updating (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async deleteBoard(id: string):Promise<Board>{
        try{
            const thisBoard:Board = await this.bm.findById(id)
            thisBoard.BoardColumns.map((item) => {
                this.cs.deleteColumn(JSON.parse(JSON.stringify(item)))
            })
            return this.bm.findByIdAndDelete(id)
        } catch(err){
            throw new HttpException(
                "Bad DELETE request at board updating (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async addColumn(column:Column, boardId: string):Promise<Board>{
        try{
            const mutBoard = await this.bm.findById(boardId)
            const newColumn = await this.cs.createColumn(column)
            mutBoard.BoardColumns.push(newColumn)
            await this.bm.findByIdAndUpdate(boardId, mutBoard)
            return await this.bm.findById(boardId)
        }catch(err){
            throw new HttpException(
                "Bad PUT request at column adding (Service)", 
                HttpStatus.FORBIDDEN
            );
        }
    }
    async removeColumn(columnId:string, boardId: string):Promise<Board>{
        try{
            console.log(columnId)
            const mutBoard = await this.bm.findById(boardId)
            console.log(mutBoard.BoardColumns)
            console.log(mutBoard.BoardColumns.indexOf(await this.cs.deleteColumn(columnId)))
            console.log(mutBoard.BoardColumns.splice(mutBoard.BoardColumns.indexOf(await this.cs.deleteColumn(columnId)), 1))
            await this.bm.findByIdAndUpdate(boardId, mutBoard)
            return await this.bm.findById(boardId)
        }catch(err){
            throw new HttpException(
                "Bad PUT request at column adding (Service)", 
                HttpStatus.FORBIDDEN
            )
        }
    }
}
