const axios = require("axios");
module.exports = {
    key: "http",
    description: "http request task using axios",
    fun: (request, response, callback) => {
        const options = request.options;
        const receiver = request.receiver;
        const name = request.name;
        new Promise(async () => {
            await axios(options).then(({ data }) => {
                callback.assign(data, receiver, response, name);
                callback.resolve();
            }).catch((error) => {
                callback.reject(error);
            });
        }).catch(error => {
            callback.reject(error);
        });
    }
};
