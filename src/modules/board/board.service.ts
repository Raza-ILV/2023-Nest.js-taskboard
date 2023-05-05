import { Inject, Injectable } from '@nestjs/common';
import { ColumnService } from '../column/column.service';
import { Board } from 'src/schemas/BoardSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from 'src/schemas/ColumnSchema';

@Injectable()
export class BoardService {
    constructor(
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
        @Inject(ColumnService) private readonly columnService:ColumnService
    ){}

    async createBoard(board:Board):Promise<Board>{
        const createdBoard = new this.boardModel(board);
        return createdBoard.save();
    }

    async getBoardById(id:string):Promise<Board>{
        return this.boardModel.findById(id)
    }

    async updateBoardById(id:string, newColumnData:Board):Promise<Board>{
        await this.boardModel.findByIdAndUpdate(id, newColumnData)
        return this.getBoardById(id)
    }

    async addColumnToBoardById(id:string, column:Column):Promise<Board>{
        const createdColumn = await this.columnService.createColumn(column)
        const updatedBoard = await this.getBoardById(id)
        updatedBoard.boardColumnsId.unshift(JSON.parse(JSON.stringify(createdColumn))._id) // pzd
        updatedBoard.boardColumnsCount += 1
        await this.boardModel.findByIdAndUpdate(id, updatedBoard)
        return updatedBoard
    }

    async removeColumnFromBoardById(id:string, columnId:string):Promise<Board>{
        const oldBoard:Board = await this.getBoardById(id)
        const oldColumnList:string[] = oldBoard.boardColumnsId
        const newColumnList:string[] = oldColumnList.filter(columnItem => columnItem !== columnId)
        await this.columnService.deleteColumnById(columnId)
        oldBoard.boardColumnsCount -= 1
        oldBoard.boardColumnsId = newColumnList
        const updatedBoard = oldBoard
        await this.boardModel.findByIdAndUpdate(id, updatedBoard)
        return updatedBoard
    }

    async addCollaboratorToBoardById(id:string, userId:string):Promise<Board>{
        const oldBoard:Board = await this.getBoardById(id)
        if(!oldBoard.boardCollaboratorsId.includes(userId)){
            oldBoard.boardCollaboratorsId.push(userId)
            oldBoard.boardCollaboratorsCount += 1
            await this.boardModel.findByIdAndUpdate(id, oldBoard)
            return oldBoard
        } else{
            return oldBoard
        }
    }

    async removeCollaboratorFromBoardById(id:string, userId:string):Promise<Board>{
        const oldBoard:Board = await this.getBoardById(id)
        if(oldBoard.boardCollaboratorsId.includes(userId)){
            oldBoard.boardCollaboratorsId = oldBoard.boardCollaboratorsId.filter(collaborator => collaborator != userId)
            oldBoard.boardCollaboratorsCount -= 1
            await this.boardModel.findByIdAndUpdate(id, oldBoard)
            return oldBoard
        } else{
            return oldBoard
        }
    }
}
