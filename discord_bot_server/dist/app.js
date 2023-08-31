"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const router_1 = require("./router");
const router_2 = require("./router");
const utils_2 = require("./utils");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev')); // logging
app.use(express_1.default.json({ verify: (0, utils_1.VerifyDiscordRequest)(config_1.PUBLIC_KEY) }));
app.get('/health', (req, res) => {
    res.status(200).send('ok');
});
app.use('/api', router_2.APIAccessRouter);
app.use('/interactions', router_1.interactionRouter);
app.use(utils_2.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map