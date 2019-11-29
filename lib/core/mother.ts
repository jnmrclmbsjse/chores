import Kid from "./kid";
import Logger from "../utils/logger"
/*jshint esversion: 6 */
class Mother {
    instance: Mother;
    winston: any = new Logger();
    constructor() {
        try {
            this.instance = this;
        } catch (error) {
            throw error;
        }
    }

    init(commands: any, variables: any) {
        const commander = this.commander;
        if (!commands) {
            return new Promise((resolve, reject) => {
                this.instance.winston.error("File: mother.ts:19 - no commands were sent and nothing happened.")
                reject(`No commands to be executed`);
            });
        }

        return new Promise((resolve, reject) => {
            try {
                commander(commands[Symbol.iterator](), variables, this).then((result) => {
                    resolve(result);
                }).catch((error: any) => {
                    reject(error);
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    private commander(commands: any, variables: any, self: Mother) {
        // Handle the last value of variables to make sure that
        // the returned value to the caller is not undefined
        let handler = variables;
        const kid = new Kid(self.instance);
        const manage = (command: any, variables: any, callback: any) => {
            try {
                kid.serve(command, variables, self.winston).then((result) => {
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
                            manage(queue.value, result, callback);
                        }
                        callback.resolve(result);
                    }
                }).catch((error: any) => {
                    if (error === "chore_missing") {
                        if (commands.next) {
                            const queue = commands.next();
                            if (!queue.done) {
                                manage(queue.value, variables, callback);
                            }
                            callback.resolve(variables);
                        }
                    }
                    // Handle the halted runner
                    callback.reject(error);
                });
            } catch (error) {
                callback.reject(error);
            }
        };

        return new Promise((resolve, reject) => {
            const callback = { resolve, reject };
            manage(commands.next().value, variables, callback);
        }).catch(error => {
            if (error === undefined) {
                return handler;
            }
            return error;
        });
    }
}

export default Mother;
