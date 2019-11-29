"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*jshint esversion: 6 */
class Job {
    constructor(instance, configuration, options, receiver, name) {
        this.instance = instance;
        this.configuration = configuration;
        this.options = options;
        this.receiver = receiver;
        this.name = name;
        if (!this.instance) {
            throw new Error(`Missing instance definition`);
        }
    }
    commence(variables) {
        const name = this.name;
        const fun = this.configuration.fun;
        const instance = this.instance;
        const options = this.options;
        const receiver = this.receiver;
        return new Promise((resolve, reject) => {
            const request = {
                __instance: instance,
                options,
                receiver,
                name
            };
            const callback = {
                resolve,
                reject,
                assign: (value, needle, haystack, name) => {
                    if (needle in haystack) {
                        haystack[needle] = value;
                    }
                    else {
                        haystack[name] = {};
                        haystack[name][needle] = value;
                    }
                    return haystack;
                }
            };
            fun(request, variables, callback);
        });
    }
}
exports.default = Job;
//# sourceMappingURL=job.js.map