"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserServerRecordController = exports.getUserServerRecordController = void 0;
const database_1 = require("../database");
const getUserServerRecordController = async (req, res, next) => {
    try {
        // create a new instance of the repository
        const botUserServerRepository = new database_1.BotUserServerRepository(database_1.BotUserModel, database_1.BotServerModel);
        // get all records
        const record = await botUserServerRepository.getAllRecords();
        // send the response
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all records',
            data: record,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserServerRecordController = getUserServerRecordController;
const createUserServerRecordController = async (req, res, next) => {
    try {
        // create a new instance of the repository
        const botUserServerRepository = new database_1.BotUserServerRepository(database_1.BotUserModel, database_1.BotServerModel);
        // create a new record
        const record = await botUserServerRepository.addRecord(req.body.user_id, req.body.user_name, req.body.server_id, req.body.server_name);
        // send the response
        res.status(201).json({
            status: 201,
            message: 'Successfully created a new record',
            data: record,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUserServerRecordController = createUserServerRecordController;
//# sourceMappingURL=recordController.js.map