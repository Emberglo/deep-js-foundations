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