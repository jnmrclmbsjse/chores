import winston from "winston";
import process from "process";
/*jshint esversion: 6 */
class Logger {
    logger: any;

    constructor() {
        const processHelper: any = process;
        let directory;
        if (processHelper.browser) {
            directory = `../../../../..error`;
        } else {
            directory = `${process.cwd()}`;
        }
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            defaultMeta: { service: "chores-execution" },
            transports: [
              new winston.transports.File({ filename: `${directory}/chores_error.log`, level: "error" }),
              new winston.transports.File({ filename: `${directory}/chores_combined.log` }),
            ],
        });
        if (process.env.NODE_ENV !== "production") {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    info(log:any) {
        var timestamp = Date.now();
        this.logger.info(`${timestamp}: informative log`);
        this.logger.info(log);
    }

    error(log:any) {
        var timestamp = Date.now();
        this.logger.error(`${timestamp}: error log`);
        this.logger.error(log);
    }
}

export default Logger;
