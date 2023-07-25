// objects are built by "constructor calls" (via new)

// a constructor call makes an object based on its own prototype

// a class is a blueprint and an instance is the actual object

// a constructor call makes an object linked to its own prototype

function Workshop(teacher) {
    this.teacher = teacher;
};

Workshop.prototype.ask = function(question) {
    console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");

deepJS.constructor === Workshop; // true - deepJS.constructor looks up the prototype chain to Workshop.Prototype which has .constructor which points at Workshop

// __proto__ is sometimes called "dunder proto"
deepJS.__proto__ === Workshop.prototype; // true

Object.getPrototypeOf(deepJS) === Workshop.prototype // true


// prototypal inheritance - all objects are linked to their parent, not copied from the parent

// JavaScript Inheritance is really Behavior Delegation

// OO Pattern - Object Oriented
// really should be called Class Oriented languages

// OLOO Pattern - Objects Linked to Other Objects
// Lua and JavaScript are the only languages where you can create an object without a class
// really should be called Object Oriented

var Workshop = {
    setTeacher(teacher) {
        this.teacher = teacher;
    },
    ask(question) {
        console.log(this.teacher, question);
    }
};

var AnotherWorkshop = Object.assign(
    Object.create(Workshop), {
        speakUp(msg) {
            this.ask(msg.toUpperCase());
        }
    }
);

var JSrecentParts = Object.create(AnotherWorkshop);

JSRecentParts.setTeacher("Kyle");

JSRecentParts.speakUp("But isn't this cleaner?"); // Kyle BUT ISN'T THIS CLEANER?

// all these objects are linked 
// Object.create used to make and link objects without using new, constructors, prototypes, etc

// How Object.create works:

if (!Object.create) {
    Object.create = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    };
};

// hides the prototypes, new, etc and uses the side effects of new to create an object


// Delegation Design Pattern

var AuthController = {
    authenticate() {
        ServiceWorkerRegistration.authenticate(
            [this.username, this.password],
            this.handleResponse.bind(this)
        );
    },
    handleResponse(resp) {
        if(!resp.ok) {this.displayError(resp.msg)};
    }
};

var LoginFormController = 
    Object.assign(Object.create(AuthController), {
        onSubmit() {
            this.username = this.$username.val();
            this.password = this.$password.val();
            this.authenticate();
        },
        displayError(msg) {
            alert(msg);
        }
    });


// virtually compsed the two objects during the function call of authenticate on line 96 using this keyword and prototypes

// this approach is more independently testable
// to test the loginFormController, you make a mock AuthController and visa versa

// delegation is what JavaScript does inherently well - classes are a bit of a forced fit

// Course taught by Kyle Simpson - getify@gmail.com

// You Don't Know JS - can read on github
// Books related to this course: Scope and Closures, This and Object Prototypes, and Types and Grammar