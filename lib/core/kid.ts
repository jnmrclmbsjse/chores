import Mother from "./mother";
import Brain from "./brain";
const uuidv1 = require("uuid");
/*jshint esversion: 6 */
class Kid {
    mother: any;
    skills: any;
    constructor(mother: Mother) {
        this.mother = mother;
        const brain = new Brain(mother.winston);
        this.skills = brain.skills;

        if (!this.mother) {
            mother.winston.error("File: kid.ts:13 - mother is not initialized.")
            throw new Error(`Missing mother definition`);
        }
    }

    serve(command: any, variables: any, winston: any) {
        const id = uuidv1();
        const mother = this.mother;
        const name = command.name;
        const options = command.options;
        const receiver = command.receiver;
        const chore = this.skills[command.key];
        if (!chore) {
            winston.info(`File: kid.ts:27 - chore "${name}" with uuid (${id}) does not exist and was skipped.`);
            return new Promise((resolve, reject) => { reject("chore_missing"); });
        }
        const fun = chore.fun;

        return new Promise((resolve, reject) => {
            const request = {
                __mother: mother,
                options,
                receiver,
                name
            };
            const callback = {
                resolve: (response: any) => {
                    winston.info(`File: kid.ts:41 - chore "${name}" with uuid (${id}) has been resolved.`);
                    resolve();
                },
                reject: (response: any) => {
                    winston.info(`File: kid.ts:45 - chore "${name}" with uuid (${id}) has been rejected.`);
                    winston.info(`File: kid.ts:46 - task runner has been halted.`);
                    reject();
                },
                logger: winston,
                assign: (value: any, needle: any, haystack: any, name: string) => {
                    if (needle in haystack) {
                        haystack[needle] = value;
                    } else {
                        haystack[name] = {};
                        haystack[name][needle] = value; 
                    }
                    return haystack;
                }
            };
            winston.info(`File: kid.ts:49 - chore "${name}" with uuid (${id}) has been executed.`);
            fun(request, variables, callback);
        });
    }
}

export default Kid;