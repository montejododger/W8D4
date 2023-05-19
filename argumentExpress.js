/////////////////////////////////////////////
// sum
// Write a sum function that takes any number of arguments:

// the () lets it be called with none or as many as we want arguments

function sum() {
    let total = 0;

    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}

// sum(1, 2, 3, 4) === 10;
// sum(1, 2, 3, 4, 5) === 15;
// Solve it first using the arguments keyword, then rewrite your solution to use the ... rest operator.

function restSum(...nums) {
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // console.log("currNum:", currNum);
    }

    return sum;
}

// restSum(1, 2, 3, 4) === 10;
// restSum(1, 2, 3, 4, 5) === 15;
//////////////////////////////////////////////////////////////////////////////////////////////
/*
Rewrite your myBind method so that it can take both bind-time arguments and call-time arguments.

A few examples:
*/

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

/////////////////////////
// ORIGINAL - no ARGS

// extending Function.prototype with myBind!
Function.prototype.myBind1 = function (ctx) {
    // capturing this and storing it in func
    const func = this;

    return function () {
        return func.apply(ctx);
    };
};

//                                          bind-time args
Function.prototype.myBind = function (ctx, ...bindArgs) {
    const func = this;

    return function (...callArgs) {
        //  bind-time and call-time args
        // could also do this
        // const args = bindArgs.concat(callArgs)
        // return func.apply(ctx, args);
        return func.call(ctx, ...bindArgs, ...callArgs);
    };
};

Function.prototype.myBind = function (context) {
    const func = this;
    const bindArgs = Array.prototype.slice.call(arguments, 1);

    // naming this inner function can be helpful for debuggin purposes
    return function _innerFunc() {
        const callArgs = Array.prototype.slice.call(arguments);
        return func.apply(context, bindArgs.concat(callArgs));
    };
};

Function.prototype.myBind = markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

////////////////////////////////////////////////////////
/*
curriedSum
Functional programming is another programming paradigm. It's an alternative to object-oriented programming, though the two can also be mixed. We'll learn more about it later, but briefly, functional programming focuses on function composition (writing functions which are given a function as an argument and return a new function).

One pattern seen in functional programming is currying. Currying is the process of decomposing a function that takes multiple arguments into one that takes single arguments successively until it has a sufficient number of arguments to run. This technique is named after the logician Haskell Curry (the functional programming language Haskell is, too).

Here's an example of two ways to use a sumThree function. The first is a typical version that takes 3 arguments; the second is a curried version:
*/

// IE:
function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30
/////////////////////////////////////////////////////////
function curriedSum(numArgs) {
    const numbers = [];

    function _curriedSum(num) {
        numbers.push(num);

        if (numbers.length === numArgs) {
            return numbers.reduce((acc, el) => acc + el);
        } else {
            return _curriedSum;
        }
    }

    return _curriedSum;
}
////////////////////////////////////////////////////////////////
Function.prototype.curry = function (numArgs) {
    const args = [];
    const func = this;

    function _curriedFn(arg) {
        args.push(arg);

        if (args.length === numArgs) {
            return func(...args);
        } else {
            return _curriedFn;
        }
    }

    return _curriedFn;
};

/////////////////////////////////////////////////////////////////
// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
sumThree.curry(3)(4)(20)(6); // == 30
