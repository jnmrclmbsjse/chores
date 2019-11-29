"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const process_1 = __importDefault(require("process"));
/*jshint esversion: 6 */
class Logger {
    constructor() {
        const processHelper = process_1.default;
        let directory;
        if (processHelper.browser) {
            directory = `../../../../..error`;
        }
        else {
            directory = `${process_1.default.cwd()}`;
        }
        this.logger = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.json(),
            defaultMeta: { service: "chores-execution" },
            transports: [
                new winston_1.default.transports.File({ filename: `${directory}/chores_error.log`, level: "error" }),
                new winston_1.default.transports.File({ filename: `${directory}/chores_combined.log` }),
            ],
        });
        if (process_1.default.env.NODE_ENV !== "production") {
            this.logger.add(new winston_1.default.transports.Console({
                format: winston_1.default.format.simple(),
            }));
        }
    }
    info(log) {
        var timestamp = Date.now();
        this.logger.info(`${timestamp}: informative log`);
        this.logger.info(log);
    }
    error(log) {
        var timestamp = Date.now();
        this.logger.error(`${timestamp}: error log`);
        this.logger.error(log);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map