const _ = require("lodash");
module.exports = {
    key: "mutate",
    description: "filters the specified variable using the specified key",
    fun: (request, response, callback) => {
        const options = request.options;
        const receiver = request.receiver;
        const name = request.name;

        const target = options.target;
        const predicate = options.predicate;

        if (!target in response) {
            callback.resolve();
        }

        const filtered = _.filter(response[target], predicate);
        callback.assign(filtered, receiver, response, name);
        callback.resolve();
    }
};
