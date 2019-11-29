"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
/*jshint esversion: 6 */
class Brain {
    constructor(winston) {
        this.processHelper = process_1.default;
        try {
            let configuration;
            if (this.processHelper.browser) {
                configuration = require(`../../../../../chrscnf.js`);
                if (!configuration) {
                    winston.error("File: brain.ts:13 - cannot find configuration file chrscnf.js, possibly chores is not initialized.");
                    throw new Error(`Missing configuration file: chrscnf.js`);
                }
            }
            else {
                configuration = require(`${process_1.default.cwd()}/.choresrc`);
                if (!configuration) {
                    winston.error("File: brain.ts:19 - cannot find configuration file .choresrc, possibly chores is not initialized.");
                    throw new Error(`Missing configuration file: .choresrc`);
                }
            }
            const filenames = configuration.jobs.map((value) => {
                return value;
            });
            this.skills = this.register(filenames, winston);
        }
        catch (error) {
            if (error) {
                throw error;
            }
            winston.error("File: brain.ts:29 - configuration file is not in proper format.");
            throw new Error(`Invalid .choresrc or .chrscnf.js file.`);
        }
    }
    register(filenames, winston) {
        if (filenames.length === 0) {
            winston.error("File: brain.ts:38 - no jobs found inside configuration file.");
            throw new Error("No jobs found.");
        }
        let response = [];
        filenames.forEach(filename => {
            try {
                let definition;
                if (this.processHelper.browser) {
                    definition = require(`../../../../../chores/${filename}`);
                }
                else {
                    definition = require(`${process_1.default.cwd()}/chores/${filename}`);
                }
                if (response[definition.key]) {
                    winston.error(`File: brain.ts:52 - "${definition.key}" job has duplicate key.`);
                    throw new Error(`Job "${definition.key}" is already registered and has duplicate.`);
                }
                if (!definition.key || !definition.description) {
                    winston.error(`File: brain.ts:56 - invalid format for chore "${definition.key}".`);
                    throw new Error(`Invalid format for job "${definition.key}".`);
                }
                response[definition.key] = definition;
            }
            catch (error) {
                throw error;
            }
        });
        return response;
    }
}
exports.default = Brain;
//# sourceMappingURL=brain.js.map