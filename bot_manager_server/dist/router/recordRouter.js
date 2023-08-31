"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get('/', middlewares_1.authMiddleware, controllers_1.getUserServerRecordController);
router.post('/', middlewares_1.authMiddleware, [
    (0, express_validator_1.body)('user_id').exists().withMessage('user_id is required'),
    (0, express_validator_1.body)('user_name').exists().withMessage('user_name is required'),
    (0, express_validator_1.body)('server_id').exists().withMessage('server_id is required'),
    (0, express_validator_1.body)('server_name').exists().withMessage('server_name is required'),
], utils_1.validateRequest, controllers_1.createUserServerRecordController);
exports.default = router;
//# sourceMappingURL=recordRouter.js.map