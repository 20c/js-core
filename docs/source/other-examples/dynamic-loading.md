# Dynamic loading

## Example

``` javascript
(function(url, onload){
  if(!window.twentyc && !window.twentyc_loading) {
    window.twentyc_loading=true;
    var script = document.createElement("script");
    script.src = url;
    script.onload = onload;
    document.head.appendChild(script);
  }
})("twentyc.core.js", function() {
  // twentyc is now available
})
```
