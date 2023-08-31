import { BotUserServerRepository, BotServerModel, BotUserModel } from "../database";
import { Request, Response, NextFunction } from "express";

export const getUserServerRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // create a new instance of the repository
        const botUserServerRepository = new BotUserServerRepository(BotUserModel, BotServerModel);
        // get all records
        const record = await botUserServerRepository.getAllRecords();
        // send the response
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all records',
            data: record,
        });
    } catch (error) {
        next(error);
    }
}

export const createUserServerRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // create a new instance of the repository
        const botUserServerRepository = new BotUserServerRepository(BotUserModel, BotServerModel);
        // create a new record
        const record = await botUserServerRepository.addRecord(
            req.body.user_id,
            req.body.user_name,
            req.body.server_id,
            req.body.server_name
        );
        // send the response
        res.status(201).json({
            status: 201,
            message: 'Successfully created a new record',
            data: record,
        });
    } catch (error) {
        next(error);
    }
}

