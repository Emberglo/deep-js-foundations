// Building your own Object.is 

if ( !Object.is || true) {
    Object.is = function ObjectIs(x, y) {
        var xNegZero = isItNegZero(x);
        var yNegZero = isItNegZero(y);

        if (xNegZero || yNegZero) {
            return xNegZero && yNegZero;
        } else if (isItNaN(x) && isItNaN(y)) {
            return true;
        } else {
            return x === y;
        }

        // checks if the value is zero or negative zero and confirmed the value is negative zero, not zero
        function isItNegZero(v) {
            return v == 0 && (1/v) == -Infinity;
        };

        //checks for NaNs
        function isItNaN(v) {
            //NaN is the only thing in JS that will return true
            return v !== v;
        };

    };
};

// new keyword examples

var yesterday =  new Date("March 6, 2019");
yesterday.toUTCString(); // "Wed, 06 Mar 2019 06:00:00 GMT"

// using the string function converts to the string type
var myGPA = String(transcript.gpa);
// "3.54"




// Coercion Corner Cases 

Number(""); // 0
Number("  \t\n"); // 0
Number(null); // 0
Number(undefined); // NaN
Number([]); // 0
Number([1,2,3]); // NaN
Number([null]); // 0
Number([undefined]); // 0
Number({}); // NaN

String(-0); // "0"
String(null); // "null"
String(undefined); // "undefined"
String([null]); // ""
String([undefined]); // ""

Boolean(new Boolean(false)); // true - converting to Boolean doesn't do any coercion, it just chest the falsy/truthy table


// Root of all coercion evil 
// toNumber("") = 0
// toNumber("          ") = 0

Number(true) // 1
Number(false) // 0

1<2 // true
2<3 // true
1<2<3 // true

//above works like:
(1<2) < 3
(true) < 3
1<3 // true

3>2 // true
2>1 // true
3>2>1 // false OOPS

//above works like:
(3>2)>1
(true)>1
1>1 // false




// function to determine if a valid name has been submitted
function isValidName(name) {
    if(
        typeof name == "string" &&
        name.trim().length >=3
    ) {
        return true;
    } else {
        return false;
    }
};

// function to determine hours attended of a seminar
function hoursAttended(attended, length) {
    // should refactor these into its own function
    if(typeof attended == "string" && attended.trim() != "") {
        attended = Number(attended);
    };

    if(typeof length == "string" && length.trim() != "") {
        length = Number(length);
    };

    if(
        typeof attended == "number" &&
        typeof length == "number" &&
        attended >= 0 &&
        length >= 0 &&
        //checks for whole numbers
        Number.isInteger(attended) &&
        Number.isInteger(length) &&
        attended <= length
    ) {
        return true;
    }

    return false;
};


// Equality

var workshop1 = {topic: null};
var workshop2 = {};

//the below if statements are the same thing because of coercion with the ==
if(
    (workshop1.topic === null || workshop1.topic === undefined) &&
    (workshop2.topic === null || workshop2.topic === undefined)
) {
    // ...
}

if (
    workshop1.topic == null &&
    workshop2.topic == null
) {
    // ...
}


// write a findAll() that searches an array and returns an array with all coercive matches
// exact matches, strings can match numbers, numbers can match strings, null can match undefined, booleans can only match booleans, objects only match exact same object


function findAll(match, arr) {
    var ret = [];

    for (let v of arr) {
        if (Object.is(match, v)) {
            ret.push(v);
        } 
        else if (match == null && v == null) {
            ret.push(v);
        }
        else if (typeof match == "boolean" && typeof v == "boolean") {
            if (match == v) {
                ret.push(v);
            }
        }
        else if (typeof match == "string" && match.trim() != "" && typeof v == "number" && !Object.is(-0, v)) {
            if (match == v) {
                ret.push(v);
            }
        }
        else if (
            typeof match == "number" && 
            !Object.is(match, -0) && 
            !Object.is(match, NaN) && 
            !Object.is(match, Infinity) && 
            !Object.is(-Infinity) && 
            typeof v == "string" &&
            v.trim() != ""
        ) {
            if (match == v) {
                ret.push(v);
            }
        }

    }

    return ret;
};