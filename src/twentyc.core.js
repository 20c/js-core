(function() {

/**
 * create root namespace for all twentyc definitions
 * @module twentyc
 */

twentyc = {};

/**
 * class helper functions
 * @module twentyc
 * @class cls
 * @static
 */

twentyc.cls = {

  /**
   * converts a string into a standardized class name, replacing
   * invalid characters with valid ones.
   *
   *     twentyc.cls.make_name("class-a"); // classA
   *     twentyc.cls.make_name("class a b"); // classAB
   *     twentyc.cls.make_name("Class-A_B"); // ClassA_B
   *
   * @method make_name
   * @param {String} name base name
   * @returns {String} class_name changed name
   */

  make_name : function(name) {
    var i, names = name.split(/[-\s]/);
    for(i = 0; i < names.length; i++) {
      if(i > 0)
        names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
    }
    return names.join("");
  },

  /**
   * create a new class - if you wish to extend a class take a look at
   * {{#crossLink "cls/extend:method"}}twentyc.cls.extend{{/crossLink}} 
   * instead
   *
   * you may define a constructor in the definition by using the class
   * name you provide at __name__
   *
   * Note that if the name you provide is not a valid variable name
   * it will be passed through twentyc.cls.make_name to make it valid
   *
   * ##examples
   *
   * * define and instantiate a class: examples/cls.define.js
   *
   * @method define
   * @param {String} name name or unique identifier of the new class
   * @param {Object} definition object literal of properties and functions that you wish define or redefine
   * @returns {Function} dest constructor of new class
   */
  
  define : function(name, definition) {

    var k;

    name = twentyc.cls.make_name(name);
    
    if(typeof(definition[name]) == "function") {
      // a constructor has been provided
      var ctor = definition[name]
      delete definition[name]
    } else {
      // no constructor provided, substitute empty constructor
      var ctor = function(){};
    }

    // cycle through definition and copy to class prototype
    for(k in definition) {
      ctor.prototype[k] = definition[k]
    }

    // create meta information
    ctor.prototype._meta = {
      "name" : name
    }

    return ctor

  },
  
  /**
   * extend an existing class with new properties and functions
   *
   * if a function is defined that already exists on the parent class
   * this function will be overwritten and a reference to the original
   * function will be provided at parentClassName_functionName
   *
   * you may define a constructor in the definition by using the class
   * name you provide at __name__
   *
   * Note that if the name you provide is not a valid variable name
   * it will be passed through twentyc.cls.make_name to make it valid
   *
   * ##examples
   * 
   * * extend and instantiate a class: examples/cls.extend.js
   * * handling method override: examples/cls.extend.method-override.js
   *
   * @method extend
   * @param {String} name name or unqiue identifier of the new class
   * @param {Object} definition object literal of properties and functions that you wish define or redefine
   * @param {Function} [parent] constructor of class 
   * that you wish to extend, if omitted an empty function will be substituted
   * @returns {Function} dest constructor of new class
   */

  extend : function(name, definition, parent) {
    
    var k;
    name = twentyc.cls.make_name(name);
    
    if(typeof(definition[name]) == "function") {
      // a constructor has been provided
      var ctor = definition[name]
      delete definition[name]
    } else {
      // no constructor provided, substitute empty constructor
      var ctor = function(){
        parent.apply(this, arguments)
      };
    }

    // cycle through parent prototype and copy to class prototype
    for(k in parent.prototype) {
      ctor.prototype[k] = parent.prototype[k]
    }

    // cycle through definition and copy to class prototype
    for(k in definition) {
      if(typeof(ctor.prototype[k]) == "function") {
        // function was already defined by parent, store backref
        ctor.prototype[parent.prototype._meta.name+"_"+k] = parent.prototype[k];
      }
      ctor.prototype[k] = definition[k]
    }
    
    // reference parent constructor
    ctor.prototype[parent.prototype._meta.name] = parent

    // create meta information
    ctor.prototype._meta = {
      "name" : name,
      "parent" : parent
    }

    return ctor


  },

  /**
   * overrides a method on the provided class
   *
   * @method override
   * @param {Function} destClass A class created via __twentyc.cls.define__ or __twentyc.cls.extend__
   * @param {String} methodName name of method that you wish to override
   * @param {Function} method new method
   */

  override : function(destClass, methodName, method) {
    
    // create reference to old method
    if(destClass.prototype[methodName])
      destClass.prototype[destClass.prototype._meta.name+"_"+methodName] = destClass.prototype[methodName];
    
    // override
    destClass.prototype[methodName] = method;

  }

}

})();
