---
title: How to use fs.createWriteStream?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
  - fs
difficulty: 3
layout: knowledge-post.hbs
---

The function `fs.createWriteStream()` creates a writable stream in a very simple manner. After a call to `fs.createWriteStream()` with the filepath, you have a writeable stream to work with. It turns out that the response (as well as the request) objects are streams. So we will stream the `POST` data to the file `output`. Since the code is simple enough, it is pretty easy just to read through it and comment why each line is necessary.
Note: With the default `flags`:`w` option, the `fs.createWriteStream()` function opens a file for writing. The file is created (if it does not exist) or truncated (if it exists). Since most browsers send more than one request to a server at a time, each new request, and therefore each new `fs.createWriteStream()` call deletes any existing data from the `output` file. So, to ensure that no possible subsequent requests remove data written by the `POST` request with the data from the `<form>` element, the `flags`:`a` option is added to the `fs.createWriteStream()` call, which then opens a file for appending data (any existing data remains unaffected).

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // This opens up the writeable stream to `output`
  var writeStream = fs.createWriteStream('./output', {flags:'a'});

  // This pipes the POST data to the file
  req.pipe(writeStream);

  // After all the data is saved, respond with a simple html form so they can post more data
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
```
