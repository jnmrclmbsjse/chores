"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mother_1 = __importDefault(require("./lib/core/mother"));
/*jshint esversion: 6 */
class Chores {
    constructor(variables) {
        this.variables = variables;
    }
    start(commands) {
        let mother;
        try {
            mother = new mother_1.default();
            return mother.init(commands, this.variables);
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
module.exports = Chores;
//# sourceMappingURL=chores.js.map