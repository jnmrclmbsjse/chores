"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = __importDefault(require("./registry"));
const job_1 = __importDefault(require("./job"));
/*jshint esversion: 6 */
class Instance {
    constructor() {
        try {
            const registry = new registry_1.default();
            this.chores = registry.jobs;
            this.instance = this;
        }
        catch (error) {
            throw error;
        }
    }
    commence(commands, variables) {
        const runner = this.runner;
        if (!commands) {
            return new Promise((resolve, reject) => {
                reject(`No commands to be executed`);
            });
        }
        return new Promise((resolve, reject) => {
            try {
                runner(commands[Symbol.iterator](), variables, this).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    runner(commands, variables, self) {
        // Handle the last value of variables to make sure that
        // the returned value to the caller is not undefined
        let handler = variables;
        const execute = (command, variables, resolve, reject) => {
            try {
                const chore = self.chores[command.key];
                if (!chore) {
                    if (commands.next) {
                        const queue = commands.next();
                        if (!queue.done) {
                            execute(queue.value, variables, resolve, reject);
                        }
                        resolve(variables);
                    }
                }
                const job = new job_1.default(self.instance, chore, command.options, command.receiver, command.name);
                job.commence(variables).then((result) => {
                    // Make sure that the next command can access the variables
                    // even if the chore does not use it
                    if (!result) {
                        result = variables;
                    }
                    // Handle here
                    handler = result;
                    if (commands.next) {
                        const queue = commands.next();
                        if (!queue.done) {
                            execute(queue.value, result, resolve, reject);
                        }
                        resolve(result);
                    }
                }).catch((error) => {
                    // Handle the halted runner
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        };
        return new Promise((resolve, reject) => {
            execute(commands.next().value, variables, resolve, reject);
        }).catch(error => {
            if (error === undefined) {
                return handler;
            }
            return error;
        });
    }
}
exports.default = Instance;
//# sourceMappingURL=instance.js.map