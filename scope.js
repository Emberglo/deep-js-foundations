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