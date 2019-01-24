var express = require('express');
var app = express();
var fs = require("fs");

app.post('/add-website', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.end();
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("启动服务成功，访问地址为 http://%s:%s", host, port)

})

// var fs = require('fs');
// fs.readFile('c:/users/Administrator/AppData/Local/Google/Chrome/User\ Data/Default/Bookmarks', {
//   encoding: 'utf8'
// }, function (err, data) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   let websites = JSON.parse(data);
//   //   console.log(websites);
//   let websites_str = JSON.stringify(websites.roots.bookmark_bar.children);
//   //   console.log(JSON.stringify(websites.roots.bookmark_bar.children))
//   var w_data = new Buffer(websites_str);
//   fs.writeFile('../demo/static/test2.json', w_data, {
//     flag: 'a'
//   }, function (err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('写入成功');
//     }
//   });
// });
