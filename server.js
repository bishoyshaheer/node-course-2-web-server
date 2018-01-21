const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


app.use(express.static(__dirname + '/public'));

//middle ware for logging( like filter )
app.use((req, res, next) => {
  var now = new Date();
  var log = now + " " + req.method + " " + req.url + "\n";
  console.log(log);
  fs.appendFileSync('server.log', log, (error) => {
    console.log('can\'t write to file', error);
  });
  next();
});

// app.use((req, res, next) => {
//   res.send({
//     status: 'UNDER_MAINTENANCE'
//   });
// });

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) =>{
  res.send({
    name: 'bishoy',
    likes: [
      'reading',
      'travelling',
      'developing'
    ]
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request.'
  });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});