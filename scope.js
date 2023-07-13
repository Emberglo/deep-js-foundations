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

