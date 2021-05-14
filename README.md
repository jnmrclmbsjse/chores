# Chores

ChoresJS or simply **Chores** is a result of lots task runners available in the market but does not fit our requirements. Some of them are too complex, while some of them are too thin.

> We came up with the name **Chores** since it is a routine task.

## Concept
Task runners are in great value when it comes to software development, especially for the automation of concatenating, minifying and other things related to manipulation of files.

So we got the concept of running tasks for the web by having a [workflow](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/docs/WORKFLOW.md) which defines the steps/chores to be executed. We have (4) four core components for a task runner.

1. `tasks` - tasks/jobs to be executed
2. `task runner` - handles the execution and queuing of tasks
3. `registry` - registers and validates the available tasks from the configuration
4. `commands` - defines the tasks/jobs to be executed

> Please note that Chores is promise based.

Enough of the concepts. Let's dig deeper!

## Folder structure

The folder and file structure is as follows:
```
.
├── bin                            # contains the chores CLI helper
│   └── chores                     # bash file
├── lib
│   ├── core
│   │   ├── brain.ts               # module for registry [reads chrscnf.ts]
│   │   ├── kid.ts                 # module that executes the tasks
│   │   └── mother.ts              # module for running tasks
│   └── utils
│       └── logger.ts              # module for logs
├── chores.ts                      # base file
├── chrscnf.ts                     # configuration file [declare chores here]
├── .choresrc                      # configuration file [declare chores here]
└── README.md
```
Let's scrutinize it.

- `bin/chores` - contains the `generate`, `list`, and `help` commands.
- `lib/core/mother.ts` - holds the steps and variables initialized, manages the execution of task by `kid.ts`
- `lib/core/kid.ts` - executes the tasks received from `mother.ts`, validates if task is registered in `brain.ts`
- `lib/core/brain.ts` - container of all the available skills for `kid.ts`
- `lib/utils/logger.ts` - helper for logging informative and error logs
- `chores.ts` - base class for Chores library
- `chrscnf.ts` - configuration/declaration file for the available chores, being read by `brain.ts` (applicable on front-end applications)
- `.choresrc` - configuration/declaration file for the available chores, being read by `brain.ts` (applicable on back-end applications)


## Using Chores
This documentation explains how to initialize Chores library on your web application.

### Register chores

Let's say you created a new chore. Inside chrscnf.ts, you can define it by importing that module and add it in configuration variable.
```
import newlyAddedChore from "@app/chores/newlyAddedChore";

const configuration = {
    keyOfNewlyAddedChore: newlyAddedChore
};

export default configuration;
```
### Walkthrough example

Let's see how to invoke Chores.

Import or require the Chores class into your module.
```
import Chores from "../path/to/chores.ts";
# or
const Chores = require("path/to/chores.ts");
```
Then, create a new instance of Chores and inject the variables you need.
> Variables are accessible inside the task/chores. You can assign results on these variables, and the chores will return these variables as response object.

> *Please note that variables should be JSON object.*
```
const variables = {
   sumHolder: null,
   resultHolder: null
}
const chores = new Chores(variables);
```
Once initialized, we can now start the task runner and inject the commands.
```
const commands = [
    {
        "key": "divide",
        "name": "divide-step",
        "options": {
            "dividend": 4,
            "divisor": 2
        },
        "receiver": "quotient"
    }
];

const result = await chores.start(commands);
# or
chores.start(commands).then(resolver => {
    ... put your logic here
}).catch(rejector => {
    ... put your logic here
});
```

#### That's it! You are now ready to use Chores library.