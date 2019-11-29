module.exports = {
    key: "redirect",
    description: "returns a 302 and url, then halts the task runner",
    fun: (request, response, callback) => {
        const options = request.options;
        const receiver = request.receiver;
        const name = request.name;
        const url = options.url;
        callback.assign({code: 302, url}, receiver, response, name);
        callback.reject();
    }
};
