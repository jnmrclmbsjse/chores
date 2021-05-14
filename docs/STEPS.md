# Steps

*Steps* or what we called *Chores* are [Workflow](https://github.com/jnmrclmbsjse/chores/blob/master/docs/WORKFLOW.md)'s main ingredient. Every time the [Chores](https://github.com/jnmrclmbsjse/chores/blob/master/README.md) library is run, these steps are executed in sequence depending on how we define it for each workflow.


## Creating chores
This documentation explains how to create chores for our app. These chores are .js files and exports a JSON object which should have 3 main keys: 

`key` `description` `fun`

Please see usage below.

### Usage

Let's look on the structure inside the chore file first.

- `key|string` - key that is related to workflow [code](https://github.com/jnmrclmbsjse/chores/blob/master/docs/WORKFLOW.md#keys)
- `description|string` - brief description of the chore
- `fun|function` - function to define what will the chore do

### Defining `fun`

The fun function has three main parameters:
-  `request|object` - request object from the defined workflow [step](https://github.com/jnmrclmbsjse/chores/blob/master/docs/WORKFLOW.md#declaring-steps)
-  `response|object` - response object which holds the variables
-  `callback|object` - callback object which contains:
    - `resolve|function` - if the chore finished successfully — invoke to continue to next chore
    - `reject|function` - invoke if an error occurred, or if you want to halt the runner
    - `assign|function` - function to assign the result to the receiver variable — (4) four parameters required
       - `result|any` - the value/object you want to assign to the receiver variable
       - `receiver|string` - the receiver key/variable name
       - `response|object` - the response object above
       - `name|string` - the [name](https://github.com/jnmrclmbsjse/chores/blob/master/docs/WORKFLOW.md#keys) of the step from the request object

### Basic CLI Usage

Do you think you will have a hard time creating your own chore? We have a CLI helper for you.

First of all though, we must explain how the CLI works.

If we simply run:

```
$ ./bin/chores generate {your chore key}
# e.g: ./bin/chores generate add
```
chores will create an `add.js` with a basic structure of a chore inside chores folder.

> Important: Please make sure to register your chore inside ~/chrscnf.ts or ~/.choresrc. See [chores](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/README.md) documentation for more information.

### Walkthrough examples

The documentation so far may make creating chores seem more complicated than it actually is. It may be easier to work through some examples. In accordance to the [workflow](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/docs/WORKFLOW.md#example) documentation example, let's create an add and divide chore.
> Make sure to [register](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/README.md#register-chores) your chore if you'll be using the chores library.

```
$ ./bin/chores generate add
$ ./bin/chores generate divide
```

Inside **chores/add.js**, change the fun into something like this:

```
fun: (request, response, callback) => {
    const options = request.options;
    const receiver = request.receiver;
    const name = request.name;

    const addend_1 = options.addend_1;
    const addend_2 = options.addend_2;
    const sum = addend_1 + addend_2;
    // assign data to the receiver variable
    callback.assign(sum, receiver, response, name)
    callback.resolve();
}
```
The function above will add the the two options from the definition then assign the sum to the receiver variable.

Now for **chores/divide.js**, change the fun into:
```
fun: (request, response, callback) => {
    const options = request.options;
    const receiver = request.receiver;
    const name = request.name;

    const dividend = options.dividend;
    const divisor = options.divisor;
    const quotient = dividend / divisor;
    // assign data to the receiver variable
    callback.assign(quotient, receiver, response, name)
    callback.resolve();
}
```
If we run this via [Chores](https://github.com/jnmrclmbsjse/chores/blob/master/README.md) library, the result will be something like this:

```
{
    sum: 3,
    quotient: 2
}
```
### Halting the runner inside the step

Just call `callback.reject()` inside the fun and that's it.
```
fun: (request, response, callback) => {
    const options = request.options;
    const receiver = request.receiver;
    const name = request.name;

    callback.reject(); // terminate/halts the runner
}
```
### Injecting variables to Chores
Let's say you have Chores library ready. You have to [initialize](https://github.com/jnmrclmbsjse/chores/blob/master/README.md#walkthrough-example) Chores and inject your variables.
```
# Initialization of Chores
var chores = new Chores({
    variable1: null,
    variable2: null,
    variable3: null
});
# Start runner
chores.start(steps);
```
### Ready-made chores
We have (4) ready-made chores:
1.  `default` - chore that will log "Hello world!"
2.  `http` - chore that will send a request via axios — please refer to [axios options](https://github.com/axios/axios#axiosconfig) for the [options](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/docs/WORKFLOW.md#declaring-steps)
3.  `mutate` - chore that will filter the array based on certain conditions — please refer to [lodash filter](https://lodash.com/docs/4.17.15#filter)
    - requires a `target` and a `predicate` variable
4.  `redirect` - chore that will send a 302 redirect response with the url to follow, halts the runner as well.

## Frequently asked questions
### How can I determine what objects are in the options variable?
> It depends on the logic and the options you configured. Let's say you defined a "comment" variable on the workflow configuration, it's your responsibility to access it on the chore like "options.comment".
### Is steps and chore different from each other?
> Sort of. Steps are instances of chore and what we define in our workflow, whilst chore is the task to be executed.
### Can I pass the result of the first chore to the next chores?
> Definitely, if you'll assign it to a variable inside response object, then it will be accessible to other chores as well.
### What if I want to use a library inside my chore?
> You just have to add it as an npm dependency of your app and require it inside your chore.
