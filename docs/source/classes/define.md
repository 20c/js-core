# twentyc.cls.define Class

## Examples

### Example 1: Define and instantiate a class

```javascript
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
```

### Example 2: Define and instantiate a class with a custom constructor

```javascript
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
```