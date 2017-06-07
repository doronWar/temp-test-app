//'use strict';
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const express = require('express');
const path       = require('path');
const logger     = require('morgan');

const app     = express();
const port    =   process.env.PORT || 3001;


app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// app.get('/sample', function(req, res) {
//   res.send('this is a sample!');
// });


app.get('/getCounter', (req, res)=>{

  const data = fs.readFileSync(__dirname + '/data.json')
  res.send(data)
});


app.post('/savecounter',(req, res)=>{
  console.info(__dirname +'/data.json');
  fs.writeFileSync( __dirname +'/data.json', JSON.stringify(req.body));
  res.send(req.body)
});







// we'll create our routes here

// START THE SERVER
// ==============================================
//app.listen(port);
console.log('Magic happens on port ' + port);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(port, function () {
  console.log('Listening...')
});

















//
//
//
//
//
// //'use strict';
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cors = require('cors');
//
// const express = require('express');
//
// // const path       = require('path');
// // const logger     = require('morgan');
//
//
//
// const app     = express();
//
//
//
// app.use(cors({
//   origin: (origin, callback) => {
//     callback(null, true)
//   },
//   credentials: true
// }));
//
// app.use(bodyParser.json());
//
//
//
// app.get('/getCounter', (req, res)=>{
//   const data = fs.readFileSync(__dirname + '/data.json')
//   res.send(data)
// });
//
//
// app.post('/savecounter',(req, res)=>{
//   console.info(req.body);
//   fs.writeFileSync( __dirname +'data.json', req.body);
//   res.send(req.body)
// });
//
//
//
// app.post('/removeSong', function(req, res) {
//   console.info(req.body);
//   res.send('song removed');
// });
//
//
//
//
// // app.post('/savecounter', (req, res) => {
// //
// //   console.info(reg.body);
// //   res.send('false');
// // });
//
//
// // app.use(express.static(path.resolve(__dirname, '../dist')));
// //
// // app.get('*', (req, res) => {
// //   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// // });
//
//
// app.listen(3001, ()=>{
//   console.info('Listening');
// })
//
//
//




