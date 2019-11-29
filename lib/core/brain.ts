import process from "process";
/*jshint esversion: 6 */
class Brain {
    skills: any
    processHelper: any = process;

    constructor(winston: any) {
        try {
            let configuration;
            if (this.processHelper.browser) {
                configuration = require(`../../../../../chrscnf.js`);
                if (!configuration) {
                    winston.error("File: brain.ts:13 - cannot find configuration file chrscnf.js, possibly chores is not initialized.")
                    throw new Error(`Missing configuration file: chrscnf.js`);
                }
            } else {
                configuration = require(`${process.cwd()}/.choresrc`);
                if (!configuration) {
                    winston.error("File: brain.ts:19 - cannot find configuration file .choresrc, possibly chores is not initialized.")
                    throw new Error(`Missing configuration file: .choresrc`);
                }
            }
            const filenames = configuration.jobs.map((value: any) => {
                return value;
            });
            this.skills = this.register(filenames, winston);
        } catch (error) {
            if (error) {
                throw error;
            }
            winston.error("File: brain.ts:29 - configuration file is not in proper format.");
            throw new Error(`Invalid .choresrc or .chrscnf.js file.`);
        }
    }

    register(filenames: string[], winston: any) {
        if (filenames.length === 0) {
            winston.error("File: brain.ts:38 - no jobs found inside configuration file.");
            throw new Error("No jobs found.");
        }
        let response: any = [];
        filenames.forEach(filename => {
            try {
                let definition;
                if (this.processHelper.browser) {
                    definition = require(`../../../../../chores/${filename}`);
                } else {
                    definition = require(`${process.cwd()}/chores/${filename}`);
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
            } catch (error) {
                throw error;
            }
        });
        return response;
    }
}

export default Brain;
