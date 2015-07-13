/**
 * examples: class definition and instatiation via twenty.cls.define
 */

/**
 * example a: define and instantiate a class
 */

var classA = twentyc.cls.define(
  
  // the class name or unique idenitifier
  "classA",
  
  // class definition
  {
    "hello" : function(){ console.log("hello world"); }
  }

);

var a = new classA();
a.hello();

/**
 * example b: define and instantiate a class with a custom constructor
 */

var classB = twentyc.cls.define(
  "classB",
  {
    // we provide the constructor by using the class name as
    // a key
    "classB" : function(value) { this.value = value },
    "hello" : function() { console.log("hello", this.value) }
  }
);

var b = new classB("somebody");
b.hello();
