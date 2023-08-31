"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post('/send-message', middlewares_1.authMiddleware, [
    (0, express_validator_1.body)('channelId').exists().withMessage('Channel ID is required'),
    (0, express_validator_1.body)('text').exists().withMessage('Text is required'),
    (0, express_validator_1.body)('imageUrl').exists().withMessage('Image URL is required'),
    (0, express_validator_1.body)('buttonText').exists().withMessage('Button Text is required'),
    (0, express_validator_1.body)('buttonUrl').exists().withMessage('Button URL is required'),
], utils_1.validateRequest, controllers_1.sendMessageToChannelController);
exports.default = router;
//# sourceMappingURL=botRouter.js.map