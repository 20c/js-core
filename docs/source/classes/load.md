# twentyc.data.loaders Class

## Examples

### Example 1: Loading data using loaders

Assume the data stored in the URL is:

```json
{
  "example" : {
    "something" : "here"
  }
}
```

```javascript
twentyc.data.loaders.register(
  "ExampleLoader",
  {
    ExampleLoader : function(id, config) {
      
      // during the ctor we make sure to set the url attribute
      config.url = "./data.load.example.json"
      
      // then make sure to call the parent ctor
      this.XHRGet(id, config);
    }
  }, 
  'XHRGet'
);

// then we need to assign our loader to a data id
twentyc.data.loaders.assign("example", "ExampleLoader");
console.log(twentyc.data.loaders.assigned("example"));

// now we can load some data
twentyc.data.load("example", {
  callback : function(payload) {
    console.log(payload.id) // "example"
    console.log(payload.data.something) // "here"
  }
});
```
