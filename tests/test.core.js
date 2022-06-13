QUnit.test("twentyc.util.get", function(assert) {
  
  var config = { "a" : "b" }

  assert.equal(twentyc.util.get(config, "a"), "b")
  assert.equal(twentyc.util.get(config, "b"), undefined);
  assert.equal(twentyc.util.get(config, "c", 123), 123);

});


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

QUnit.test("twentyc.cls.Registry", function(assert) {
  
  var reg = new twentyc.cls.Registry();
  var classBase = reg.register(
    "base",
    { 
      "base" : function(value) { this.value = value },
      "a" : function() { return this.value }
    }
  );

  var classExtended = reg.register(
    "extended",
    {
      "a" : function() { return this.base_a() * 10 }
    },
    "base"
  );

  var b = new classBase(10);
  var e = new classExtended(10);

  assert.equal(b.a(), 10);
  assert.equal(e.a(), 100);

});

QUnit.test("twentyc.util.SmartTimeout", function(assert) {
  var done = assert.async(),
      n = 0;
  
  var callback = function() { 
    n++;
  };

  var callbackDone = function() {
    assert.equal(n, 1);
    done();
  };

  var timer = new tc.u.SmartTimeout(callback, 100);
  timer.set(callback, 50);
  
  new tc.u.SmartTimeout(callbackDone, 150);

});

QUnit.test("twentyc.util.require_namespace", function(assert) {  
  var ns = tc.u.require_namespace("twentyc.test.namespace");
  ns.a = 1
  assert.equal(typeof twentyc.test.namespace, "object")
  assert.equal(twentyc.test.namespace.a, 1);
});

QUnit.test("twentyc.jq.plugin", function(assert) {
  
  var a = 0;

  twentyc.jq.plugin(
    "testPlugin",
    {
      init : function(config) {
        console.log("INIT", config);
        assert.equal(config.r, 5);
        a++;
      },
      add : function(n) {
        a += (n || 5);
      }
    },
    { 
      r : 5
    }
  );

  assert.equal(typeof $.fn.testPlugin, "function");
  $().testPlugin();
  assert.equal(a, 1);
  $().testPlugin("add", 2)
  assert.equal(a, 3);
  $().testPlugin("add")
  assert.equal(a, 8);

});

QUnit.test("twentyc.data.update", function(assert) {

  var data = {a : "hello"},
      id = "update-test",
      id2 = "update-test-2";
  
  twentyc.data.set(id, data);
  
  twentyc.data.update(id, {b : "world"});

  assert.equal(twentyc.data.get(id).b, "world");

  twentyc.data.update(id2, {x : "y"});

  assert.equal(twentyc.data.get(id2).x, "y");

});

QUnit.test("twentyc.data.load/has/get", function(assert) {
  
  twentyc.data.loaders.register(
    "Test",
    {
      Test : function(id, config) {
        this.XHRGet(id, config);
        this.config.url = "http://localhost:9876/base/tests/test.json"
      }
    },
    "XHRGet"
  );

  twentyc.data.loaders.assign("test", "Test")

  var done = assert.async()
  var done2 = assert.async()

  var n = 0;
  var j = 0;

  $(twentyc.data).on("load", function(ev, payload) {
    j++;
  });

  assert.equal(twentyc.data.has("does-not-exist"), false);

  twentyc.data.load(
    "test", 
    {
      callback : function(payload) {
        assert.equal(payload.data.a, 123);
        assert.equal(twentyc.data.has("test"), true);
        n++;
        done();

      }
    }
  );

  twentyc.data.load(
    "test", 
    {
      callback : function(payload) {
        assert.equal(payload.data.a, 123);
        n++;
        done2();
        //var done3 = assert.async();

        twentyc.data.load(
          "test", 
          {
            reload : true,
            callback : function() {
              assert.equal(n, 2);
              assert.equal(j, 2);
              //done3();
            }
          }
        );
      }
    }
  );
});
