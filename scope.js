var teacher = "Kyle"; // Red Marble (global scope)

function otherClass() { // Red Marble (global scope)
    var teacher = "Suzy"; // Blue Marble (otherClass scope)
    // can't lexically reference the red marble from line one because there is a shadow (blue marble from line 4) while inside this function
    console.log("Welcome!");
};

function ask() { // Red Marble (global scope)
    var question = "Why?" // Green marble (ask scope)
    console.log(question); // To find the identifier question, we look in the Green Bucket for the Green Marble of question
};

otherClass(); // "Welcome!"
ask(); // "Why"



// function declaration - attach their name to the encolsing scope - Red Marble
function teacher() {}

// function expression - add their marble to their own scope - anotherTeacher = Blue Marble (myTeacher would be a Red Marble)
var myTeacher = function anotherTeacher() {
    console.log(anotherTeacher);
};

// named function expression - should prefer this over the anonymous versions
var keyHandler = function keyHandler() {}

// anonymous function expression
var clickHandler = function() {}
var clickHandler2 = () => {}

// why to use named function expressions
// 1 - reliable function self-reference (recursion, eventhandler, unbinding, accessing properties, etc)
// 2 - more debuggable stack traces
// 3 - makes your code more self-documenting

// this:
var ids = people.map(function getId(person) {return person.id});
// is better than this:
var ids = people.map(person => person.id);

// named function definitions 
//            > 
//named function expressions 
//            > 
//anonymous function expressions


// function expressions exercise

function getStudentById(studentId) {
    return studentRecords.find(function matchId(record) {
        return (record.id == studentId);
    })
}

function printRecords(recordIds) {
    var records = recordIds.map(getStudentById);

    // can and should probably be extracted to it's own function
    records.sort(function sortByNameAsc(record1, record2) {
        if (record1.name < record2.name) {
            return -1;
        } else if (record1.name > record2.name) {
            return 1;
        } else {
            return 0;
        }
    });

    records.array.forEach(function printRecord(record) {
        console.log(`${record.name} (${record.id}) : ${record.paid} ? "Paid" : "Not Paid"`)
    });
}

function paidStudentsToEnroll() {
    var idsToEnroll = studentRecords.filter(function needsToEnroll() {
        return (record.paid && !currentEnrollments.includes())
    })
    .map(function getStudentId(record) {
        return record.id;
    });

    return [...currentEnrollment, ...idsToEnroll];
}

function remindUnpaid(recordIds) {
    var unpaidIds = recordIds.filter(function isUnpaid(studentId) {
        var record = getStudentById(studentId);
        return !record.paid;
    });

    printRecords(unpaidIds);
}

//same functionality as above but written with anonymous/arrow functions

var getStudentById = studentId => studentRecords.find(record => record.id == studentId);

var printRecords = recordIds => 
    recordIds.map(getStudentById)
    .sort((record1, record2) => (record1.name < record2.name) ? -1 : (record1.name > record2.name) ? 1 : 0)
    .forEach(record => console.log(`${record.name} (${record.id}) : ${record.paid} ? "Paid" : "Not Paid"`));

var paidStudentsToEnroll = () => [
    ...currentEnrollment,
    ...(studentRecords.filter(record => record.paid && !currentEnrollments.includes())).map(record => record.id)
];

var remindUnpaid = recordIds => 
    printRecords(recordIds.filter(studentId => !getStudentById().paid));



function anotherTeacher() {
    var teacher = "Suzy";
    console.log(teacher);
}

// can call above function like normal
anotherTeacher();

// can put parenthases around the function name and still call it:
(anotherTeacher)();

// can put the function definition in parenthases and call it immediately
(function anotherTeacher() {var teacher = "Susy"; console.log(teacher);})();

// the above is IIFE - Immediately Invoked Function Expression
// used so we can have a "private" scope for the execution of that function
// wrapping the function in parenthases turns the function into an expression rather than a declaration

// can be written anonymoutly as well: (DONT)
(function(teacher) {console.log(teacher);})("Suzy");
// if you can't come up with a name to use, just use IIFE as the name. Makes debugging and things easier.

// another use for IIFEs - making statements (like try/catch) into expressions
var teacher;
try {
    teacher = fetchTeacher(1)
}
catch (err) {
    teacher = "Kyle"
}

// becomes:

var teacher = (function getTeacher() {
    try {
        return fetchTeacher(1);
    }
    catch (err) {
        return "Kyle";
    }
})();

// Block Scoping

// instead of an IFFE:
var teacher = "Kyle";

(function anotherTeacher() {
    var teacher = "Suzy";
    console.log(teacher); // "Suzy"
})

console.log(teacher); // "Kyle"

// use a block

var teacher = "Kyle";

{
    let teacher = "Suzy";
    console.log(teacher); // "Suzy"
}

console.log(teacher); // "Kyle"

// using var in the block would attach itself to the outer scope, so we have to use let
// blocks aren't scopes until they have a let or const inside of them

// realistic use case of block scoping:
function diff(x, y) {
    if (x > y) {
        let temp = x;
        x = y;
        y = temp;
    }

    return y - x;
}

// by putting the temp inside the if statement, you were telling the reader that it "belongs" to the if
// using let rather than var reinforces that it's a temp variable and only to be used in that if statement


// var or let

function repeat(fn, n) {
    // use var when the variable will be used throughout the function
    var result;

    // use let for localized variables like in loops
    for (let i = 0; i < n; i++) {
        result = fn(result, i);
    }

    return result;
}

// car can be used more than once in a function and let can't be used this way

function lookupRecord(searchStr) {
    try {
        var id = getRecord(searchStr);
    } catch (err) {
        var id = -1;
    }

    return id;
}

// if you want to use let at the top level of a function open and explicit let block

function formatStr(str) {
    { let prefix, rest;
        prefix = str.slice(0, 3);
        rest = str.slice(3);
        str = prefix.toUpperCase() + rest;
    }

    if (/^FOO:/.test(str)) {
        return str;
    }

    return str.slice(4);
}


// hoisting

student;
teacher;
var student = "you";
var teacher = "Kyle";

// hoisting says that JS would move the var declarations ahead of the execution - this doesn't actually happen
// hoisting is a shorthand for talking about parsing/lexical scope
// basically hoisting pretends that the compiler/parser only makes a single pass and magically identifies declarations
// instead of making two passes with the first identifying delcarations and scopes and the second handling the executions
// for the same reason it doesn't move variables, it doesn't move functions

// if you assign an unnamed function to a variable, you have to have that function defined before you try to execute it

// var hoisting is usually bad (hard to read, etc)
// function hoisting is usually pretty useful

// "let doesn't hoist" - innacurate statement

{
    teacher = "Kyle"; // TDZ error
    let teacher;
}

// let actually does hoist:

var teacher = "Kyle";

{
    console.log(teacher); // TDZ error
    let teacher = "Suzy";
}

// if the teacher on line 274 did not hoist, the console log on 273 should have printed "Kyle"
// because in the scope at line 273, there is no teacher so it should have gone up a level

// lets and consts still hoist but differently 
// lets and const only hoist to a block var hoists to a function
// during compile time when it says there will be a var variableName, it also says when the scope starts initialize the variableName to undefined
// when let hoists in block scope if creates a location called let variableName but don't initialize it


