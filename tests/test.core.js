QUnit.test("twentyc.cls.define", function(assert) {
  var classA = twentyc.cls.define(
    "classA",
    {
      "a":function(){return "z"}
    }
  );

  var a = new classA()
  assert.equal(a.a(), "z")
});

QUnit.test("twentyc.cls.define-custom-ctor", function(assert) {
  var classA = twentyc.cls.define(
    "classA",
    {
      "classA" : function(value) {this.value=value},
      "a" : function() { return this.value }
    }
  );
  
  var a = new classA("z");
  assert.equal(a.a(), "z");
});

QUnit.test("twentyc.cls.extend", function(assert) {

  var classA = twentyc.cls.define(
    "classA",
    { 
      "a" : function() { return "hello" },
      "b" : function() { return "z" },
      "c" : function() { return "y" }
    }
  );

  var classB = twentyc.cls.extend(
    "classB",
    {
      "a" : function() { return this.classA_a() + " world" }
    },
    classA
  );

  var classC = twentyc.cls.extend(
    "classC",
    {
      "a" : function() { return this.classB_a() + " and everybody else" }
    },
    classB
  );

  var classD = twentyc.cls.define(
    "classD",
    {
      "classD" : function(a) {
        this.a = a;
      }
    }
  );

  var classE = twentyc.cls.extend(
    "classE",
    {},
    classD
  );

  var classF = twentyc.cls.extend(
    "classF",
    {
      "classF" : function(a,r) {
        this.classD(a*r)
      }
    },
    classE
  );

  var a = new classA();
  var b = new classB();
  var c = new classC();
  var d = new classD(10);
  var e = new classE(10);
  var f = new classF(10, 10);
  assert.equal(b.a(), "hello world");
  assert.equal(b.b(), "z");
  assert.equal(b.c(), "y");
  assert.equal(a.a(), "hello");
  assert.equal(c.a(), "hello world and everybody else");
  assert.equal(d.a, 10);
  assert.equal(e.a, 10);
  assert.equal(f.a, 100);
});

QUnit.test("twentyc.cls.extend-custom-ctor", function(assert) {

  var classA = twentyc.cls.define(
    "classA",
    { 
      "classA" : function(value) { this.value = value },
      "a" : function() { return this.value },
    }
  );

  var classB = twentyc.cls.extend(
    "classB",
    {
      "classB" : function(value, multiplier) { 
        this.classA(value);
        this.multiplier = multiplier
      },
      "a" : function() { return this.value * this.multiplier }
    },
    classA
  );

  var a = new classA(2);
  var b = new classB(2,10);
  assert.equal(a.a(), 2);
  assert.equal(b.a(), 20);
});

QUnit.test("twentyc.cls.make_name", function(assert) {
  
  assert.equal(twentyc.cls.make_name("class-a"), "classA");
  assert.equal(twentyc.cls.make_name("class_a"), "class_a");
  assert.equal(twentyc.cls.make_name("class a b"), "classAB");

});

QUnit.test("twentyc.cls.override", function(assert) {

  var classA = twentyc.cls.define(
    "classA",
    { 
      a : function() { return 10; }
    }
  );

  twentyc.cls.override(classA, "a", function() { return this.classA_a() * 10; });

  var a = new classA();

  assert.equal(a.a(), 100);


  
});
