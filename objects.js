// Objects (Oriented)

// this
// class{}
// Prototypes
// "Inheritance" vs "Behavior Delegation" (OO vs OLOO)


// this keyword
// a function's this references the execution context for that call, determened entirely by how the function was called
// a this aware function can thus have a different context each time it's called, which makes it more flexible and reuseable


// dynamic scope

var teacher = "Kyle";

function ask(teacher) {
    console.log(teacher, question);
};

function otherClass() {
    var teacher = "Suzy";

    ask("Why?");
};

otherClass(); // Suzy Why?


// version with this keyword
// this looks at the context object where the function is called

function ask(question) {
    console.log(this.teacher, question);
};

function otherClass() {
    var myContext = {
        teacher: "Suzy",
    };

    ask.call(myContext, "Why?");
};

otherClass(); // Suzy Why?

// dynaice context ~= JS's dynamic scope


// 4 ways to invoke a function in JS
// function()
// function.call()
// new function()
//


// implicit binding
var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

workshop.ask("What is implicit binding?"); // Kyle What is implicit binding?

// this keyword points that the object that is used to invoke it - above it's the workshop object


// dynamic binding -> sharing

function ask(question) {
    console.log(this.teacher, question);
};

var workshop1 = {
    teacher: "Kyle",
    ask: ask,
};

var workshop2 = {
    teacher: "Suzy",
    ask: ask,
};

workshop1.ask("How do I share a method?"); // Kyle How do I share a method?
workshop2.ask("How do I share a method?"); // Suzy How do I share a method?

// this is referecnging whichever object is used to invoke it


// explicit binding

function ask(question) {
    console.log(this.teacher, question);
};

var workshop1 = {
    teacher: "Kyle",
};
var workshop2 = {
    teacher: "Suzy",
};

ask.call(workshop, "Can I explicitly set context?"); // Kyle Can I explicitly set context?
ask.call(workshop, "Can I explicitly set context?"); // Suzy Can I explicitly set context?



// hard binding

var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

// invokes workshop.ask in global because of the settimeout
setTimeout(workshop.ask, 10, "Lost this?"); // undefined Lost this?

// forcing the .this to use the workshop as the binding - loses flexibility
setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?"); // Kyle Hard bound this?


// new binding
// constructor calls

function ask(question) {
    console.log(this.teacher, question);
};

var newEmptyObject = new ask("What is 'new' doing here?"); // undefined What is 'new' doing here?

// what are the things the new keyword is doing when used to invoke a function (constructor call)
// create a brand new empty object
// links that object to another object
// call function with this keyword paointed to the new object
// if function doesn't return an object, assumes return of this


// default binding

var teacher = "Kyle";

function ask(question) {
    console.log(this.teacher, question);
};

// in non strict mode, this falls back to gobal
ask("What's the non-strict-mode default?"); // Kyle What's the non-strict-mode default?

// in strict mode if there's no this binding, this = undefined
askAgain("What's the strict-mode default?"); // TypeError


// have to look at how the function is being called to determine what the this keyword refers to


//this determination

var workshop = {
    teacher: "Kyle",
    ask: function ask(question) {
        console.log(this.teacher, question);
    },
};

new (workshop.ask.bind(workshop))("What does this do?"); // undefined What does this do?

// 1 - Was function created by new? - the new object will be this
// 2 - Is the function called by call() or apply()? - the context object specified will be this
//      bind() effectively uses apply()
// 3 - Is function called on a context object? - this will be that context object
// 4 - Default: global object (except in strict mode: undefined)


// arrow functions

var workshop = {
    teacher: "Kyle",
    ask(qustion) {
        setTimeout(() => {
            console.log(this.teacher, question);
        }, 100);
    },
};

workshop.ask("Is this lexical 'this'?"); // Kyle Is this lexical 'this'?

// arrow functions don't have a this at all
// lexical this - an arrow function does not define a this keyword, so if you put a this inside an arrow function it will lexically resolve like any other variable (look to parent scope) until it finds a scope with a defined this
// in this example this looks from the arrow function up to the ask() scope and ask()'s this was set by the call site to point at the workshop object


var workshop = {
    teacher: "Kyle",
    ask: (question) => {
        console.log(this.teacher, question);
    },
};

workshop.ask("What happened to 'this'?"); // undefined What happend to 'this'?

workshop.ask.call(workshop, "Still no 'this'?"); // undefined Still no 'this'?

// arrow function has no this, so it looks to parent scope, which in this case is global and gets undefined
// objects are not scopes just because they have curly braces


// the only time you should use an arrow function is when you want to benefit from lexical this 
// Kyle wrote an eslint rule that requires arrow functions to make this references:
// https://github.com/getify/eslint-plugin-arrow-require-this

// if you're going to use an arrow function for lexical this you need to combat the downsides:
// anonymous functions don't have a self reference - needed for recursion or binding
// they don't have a name - use it so it gets a name inference (assign to a variable, etc)
// need to have a way to make the purpose of the function clear - don't make readers read the function body

// var self = this should really be var context = this - but its a hacky way of setting it - better to use an arrow function





// es6 class keyword

// syntatcic sugar layered on top of prototypes

// classes don't have to be statements, they can be expressions and can be anonymous (don't do that)

class Workshop {
    constructor(teacher) {
        this.teacher = teacher;
    };

    ask(question) {
        console.log(this.teacher, question);
    };
};

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'class' a class?"); // Kyle Is 'class' a class?
reactJS.ask("Is this class OK?"); // Suzy Is this class OK?

class AnotherWorkshop extends Workshop {
    speakUp(msg) {
        this.ask(msg);
    };
};

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes getting better?"); // Kyle Are classes getting better?

// super keyword allows you to do relative polymorphism

class Workshop {
    constructor(teacher) {
        this.teacher = teacher;
    };

    ask(question) {
        console.log(this.teacher, question);
    };
};

class AnotherWorkshop extends Workshop {
    ask(msg) {
        super.ask(msg.toUpperCase());
    };
};

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.ask("Are classes super?"); // Kyle ARE CLASSES SUPER?

// if you have a child class that defines a method with the same name as the parent class (shadowing) you can refer to the parent from the child super.methodName

// there was no way to do relative polymorphism until es6 classes

// didn't change anything fundamentally on function calls and this binding

// if you define a parent class wtih no constructor that has a child class with a constructor:
// you have to call super() first thing in the child constructor