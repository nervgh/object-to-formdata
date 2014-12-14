# Object.toFormData()

## About
Converts json-like object with `[File]`, `[FileList]`, `[Blob]` to `[FormData]` object

## Required
[Object.traverse](https://github.com/nervgh/object-traverse), Object.getPrototypeOf, Array.prototype.forEach, Array.prototype.map, window.FormData

## Syntax
```js
// convert object to [FormData]
var form = Object.toFormData(object /*{Object|Array}*/);

// send this object
var xhr = new XMLHttpRequest();
xhr.open('POST', '/');
xhr.onload = function() {
    alert(xhr.responseText);
};
xhr.send(form);
```
