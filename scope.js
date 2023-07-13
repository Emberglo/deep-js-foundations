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

