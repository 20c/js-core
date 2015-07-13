/**
 * examples: class extending and instatiating via twentyc.cls.extend 
 */

/**
 * example a: extend and instantiate a class
 */

var classA = twentyc.cls.define(
  
  // the class name or unique idenitifier
  "classA",
  
  // class definition
  {
    "hello" : function(){ return "hello world" }
  }

);

var classB = twentyc.cls.extend(
  
  // the class name of unique identifier (needs to only be unique to
  // any of the parent classes
  "classB",

  // class definition
  {
    // new method that didnt exist on classA
    "bye" : function() { return "bye world" },

    // overridden method
    "hello" : function() {
      // we can still reference the parent method
      return this.classA_hello()+" and everybody else";
    }
  },

  // the class we wish to extend
  classA
)

var a = new classA();
var b = new classB();

console.log(a.hello()) // hello world
console.log(b.hello()) // hello world and everbody else
console.log(b.bye())   // bye world
