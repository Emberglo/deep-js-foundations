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