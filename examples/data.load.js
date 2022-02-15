/**
 * examples: data loading and storage
 */

// first we define our loader
// it will extend the XHRGet loader because we intend
// to load data from an xmlhttprequest GET request

twentyc.data.loaders.register(
  "ExampleLoader",
  {
    ExampleLoader : function(id, config) {

      // during the ctor we make sure to set the url attribute
      config.url = "data.load.example.json"

      // then make sure to call the parent ctor
      this.XHRGet(id, config);
    }
  },
  "XHRGet"
);

// then we need to assign our loader to a data id
twentyc.data.loaders.assign("example", "ExampleLoader");

// now we can load some data
twentyc.data.load("example", {
  callback : function(payload) {
    console.log(payload.id) // "example"
    console.log(payload.data.something) // "here"
  }
});

// doing another load call right after, will work as expected
// but wont retrieve the data twice, event if the first
// request had not returned yet
twentyc.data.load("example", {
  callback : function(payload) {
    console.log(payload.id) // "example"
    console.log(payload.data.something) // "here"
  }
});

// in order to force a data re-load pass the reload
// attribute
twentyc.data.load("example", {
  reload : true,
  callback : function(payload) {
    console.log(payload.id) // "example"
    console.log(payload.data.something) // "here"
  }
});

// you may access data that has been loaded at anytime
// using get
twentyc.data.get("example"); // { "something" : "here" }
