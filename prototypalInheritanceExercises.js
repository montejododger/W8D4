// Inheritance Exercises
/*
inherits
We've learned a couple of ways to implement class inheritance in Javascript. Let's first look at using a Surrogate.

There are a number of steps:

Define a Surrogate class
Set the prototype of the Surrogate (Surrogate.prototype = SuperClass.prototype)
Set Subclass.prototype = new Surrogate()
Set Subclass.prototype.constructor = Subclass
Write a Function.prototype.inherits method that will do this for you. Do not use Object.create right now; you should deeply understand what the new keyword does and how the __proto__ chain is constructed. This will help you in the upcoming Asteroids project:
*/
Function.prototype.inherits = function (BaseClass) {
    function Surrogate() {}
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
};

function MovingObject() {}

function Ship() {}
Ship.inherits(MovingObject);

function Asteroid() {}
Asteroid.inherits(MovingObject);

//FLEX TIME

///////////////////////////////////////////////////////
// non monkey patching way
function inherits(ChildClass, ParentClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
};
/////////////////////////////////////////////////////
// wrong time
// function inherits (ChildClass, ParentClass) {
//     ChildClass.prototype = ParentClass.prototype;
// }

///////////////////////////////////////////////////

Function.prototype.myBind = function (ctx, ...bindArgs) {
    const func = this;
    return function (...callArgs) {
        return func.call(ctx, ...bindArgs, ...callArgs);
    };
};
