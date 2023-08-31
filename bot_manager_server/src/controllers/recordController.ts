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


