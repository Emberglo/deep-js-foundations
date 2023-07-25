// only way to have confidence over runtime behavior is to limit/eliminate dynamic typing

// Alternative to Typescript/Flow

// Typl - https://github.com/getify/Typl

// It's a type aware linter for standard JS

// Only standard JS Syntax
// Compiler and Runtime (both optional)
// Completely Configurable (ie ESLint)
// Main Focus: inferring or annotating value types, Optional: "static typing"
// With the grain of JS, instead of against it

// string here is a template tag and is valid JS
var teacher = string`Kyle`;

teacher = { name: string`Kyle` };
// Error: can't assign object to string


// annotating your values instead of your variables


// type assertion

var student = { age: int`42` };

// whereever student.age comes from, it must be a number
var studentAge = number`$student.age` + number`1`;


// type signatures

// studentRec must be an object with a name key which must hold a string
function getName(studentRec = { name = string }) {
    return studentRec.name;
};

var firstStudent = { name: string`Frank` };

var firstStudentName = getName(firstStudent);


// multi pass inferencing

var three = gimme(3);
var greeting = "hello" + three; // Error: "string" + "int"

// knows that num holds an int because that's what we passed it on first call
function gimme(num) {
    return num;
};

// typescript/flow won't catch the above because it infers any types

