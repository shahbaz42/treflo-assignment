"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const database_1 = require("./database");
const router_1 = require("./router");
const router_2 = require("./router");
(0, database_1.connectToDatabase)()
    .then(() => console.log('Database connected'))
    .catch((error) => { console.log(error); });
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev')); // logging
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.status(200).send('ok');
});
app.use('/api/record', router_1.recordRouter);
app.use('/api/bot', router_2.botRouter);
app.use(utils_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map