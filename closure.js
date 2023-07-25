var teacher = "Kyle";

var myTeacher = function() {
    console.log(teacher);
}

teacher = "Suzy";

myTeacher();

// closure is not capturing a value, it's preserving access to variables


// Module Pattern

//collecting data and functions in an object
// this is a Namespace not a Module
var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

workshop.ask("Is this a module?"); // Kyle Is this a module?

// modules require encapsulation - the above example is all public so it has no encapsulation


// modules encapsulate data and behavior (methods) together. The state (data) of a module is held by its methods via a closure.


// classic/revealing module pattern (iffy - module singleton)
var workshop = (function Module(teacher) {
    var publicAPI = {ask, };
    return publicAPI;

    function ask(question) {
        console.log(teacher, question);
    };
})("Kyle");

workshop.ask("It's a module, right?");  // Kyle It's a module, right?

// closure protects state of teacher from public access but still allows us access to it through the ask function


// module factory - creates a new instance of our module every time it's called

function WorkshopModule(teacher) {
    var publicAPI = {ask, };
    return publicAPI;

    function ask(question) {
        console.log(teacher, question);
    };
};

var workshop = WorkshopModule("Kyle");

workshop.ask("It's a module, right?"); // Kyle It's a module, right?


// es6 module pattern
// to use modules in node, you have to use a different file extension .mjs (first part of solution was expected in 2020 - don't know status now)
// workshop.mjs:
var teacher = "Kyle";

export default function ask(question) {
    console.log(teacher, question);
};

// file assumes everything is private
// anything exported is public

// impossible to have more than one module in the same file
// file is a singleton
// have to expose a factory function if you want that pattern

// type main types of import in regular code:

// named import:
import ask from "workshop.mjs";

ask("It's a default import, right?"); // Kyle It's a default import, right?

// namespace import:
import * as workshop from "workshop.mjs";

workshop.ask("It's a namespace import, right?"); // Kyle It's a namespace import, right?

