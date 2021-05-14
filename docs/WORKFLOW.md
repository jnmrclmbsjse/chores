# Workflows

Workflows are collections of steps or what we called chores. These steps are being executed in sequence using [Chores](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/README.md) Task Runner Library. If you are not familiar with the library, please read its [documentation](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/README.md).

## Configuring workflows

This documentation explains how to configure workflows for your project. Please mind that you can declare multiple chores/steps but it would be ignored and skipped if it does not exist or not declared on the consuming web application.

Workflow configurations are data-driven and can be stored on any data storage of your choice (as long as it's in key-value pair JSON format). There are required keys for the JSON object. Please see usage section below.

### Usage
Now we're all set up, we can look at defining some workflow.

#### Keys
- `code|string` - user/developer defined workflow code
- `name|string` - name of the workflow
- `description|string` - brief description for the workflow
- `steps|array` - collection of chores and its parameters

#### Declaring `steps`
- `key|string` - key/code of the chore to be executed in consuming web application
- `name|string` - unique name for the step, this will be used for logging as well
- `options|object` - an object of key-value pair that the chores can use/manipulate
- `receiver|string` - the variable that will hold the result of the step/chore

#### Example
```
{
  "code": "math-workflow", # we define this code
  "name": "Math Workflow", # we define this name
  "description": "Workflow for addition and subtraction", # we define this description
  "steps": [
      {
          "key": "add", # there must be an add.js with "add" key on the consuming application
          "name": "add-step", # this would reflect on chores library logs
          "options": {
              "addend_1": 1,
              "addend_2": 2
          },
          "receiver": "sum" # this variable will hold the result of this step
      },
      {
          "key": "divide", # there must be a divide.js with "divide" key on the web application
          "name": "divide-step",
          "options": {
              "dividend": 4,
              "divisor": 2
          },
          "receiver": "quotient" # this variable will hold the result of this step
      }
  ]
}
```
Please see result of the example workflow in this [documentation](https://gitlab.com/jnmrclmbsjse/choresjs/-/blob/master/docs/STEPS.md#walkthrough-examples).

## Frequently asked questions
#### What are the available values for options key on steps?
> It will all depend on you and the available chores, these options will be accessed depending on the logic inside the chore definition.
#### What if the receiver variable is not defined on the consuming app?
> The chore library will still return the result under the name of the step you defined. So the "name" key is important for each steps.
#### Can we use the same chore/step twice?
> Definitely, you just have to differentiate it through its name.
#### What if the defined step does not exist on the consuming app?
> Don't you worry, the library is bright enough to ignore the step. So you can do "define now, implement later".

#### That's it! We will now let the consumer web application and chores library do the heavy lifting.
