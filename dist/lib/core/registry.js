"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
/*jshint esversion: 6 */
class Registry {
    constructor() {
        this.processHelper = process_1.default;
        try {
            let configuration;
            if (this.processHelper.browser) {
                configuration = require(`../../../../../chrscnf.js`);
                if (!configuration) {
                    throw new Error(`Missing configuration file: chrscnf.js`);
                }
            }
            else {
                configuration = require(`${process_1.default.cwd()}/.choresrc`);
                throw new Error(`Missing configuration file: .choresrc`);
            }
            const filenames = configuration.jobs.map((value) => {
                return value;
            });
            this.jobs = this.register(filenames);
        }
        catch (error) {
            throw error ? error : new Error(`Invalid .choresrc file.`);
        }
    }
    register(filenames) {
        if (filenames.length === 0) {
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
                    throw new Error(`Job "${definition.key}" is already registered and has duplicate.`);
                }
                if (!definition.key || !definition.description) {
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
exports.default = Registry;
//# sourceMappingURL=registry.js.map