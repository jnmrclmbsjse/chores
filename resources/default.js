module.exports = {
    key: "default",
    description: "default job",
    fun: (request, response, callback) => {
        console.log("Hello world!");
        callback.resolve(response);
    }
};
