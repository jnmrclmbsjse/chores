import Mother from "./lib/core/mother";
/*jshint esversion: 6 */
class Chores {
    variables: any;
    constructor(variables: any) {
        this.variables = variables;
    }
    start(commands: []) {
        let mother;
        try {
            mother = new Mother();
            return mother.init(commands, this.variables);
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
}

export = Chores;
