const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function HTTPGetRootHandler(req, res) {
  res.send("Hello world");
});

// Selain define endpoint products,
// Kita juga bisa mengkombinasikan untuk membaca file json di sini
// dan menampilkannya ke dalam browser kita, yay !
app.get('/products', function HTTPGetUsersHandler(req, res) {
  fs.readFile('./data/dummy.json', 'utf8', function readHandler(err, data) {
    if(err) {
      res.send(err);
    }

    res.send(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});