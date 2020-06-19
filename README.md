## Table of Content
1. [express What is](#express-what-is)
1. [How to expressing express](#how-to-expressing-express)
1. [How to use nodemon](#how-to-use-nodemon)
1. [Basic express usage](#basic-express-usage)
1. [Reference](#reference)

## `express` What is

Pernah gak berpikir, ketika kita belajar nodejs, ujungnya `console.log` 
terus terusan, pada akhirnya CLI lagi, CLI lagi, duh bosen banget ga sih?

Nah pada pembelajaran kali ini, kita akan mempelajari, bagaimana menggunakan
nodejs agar tidak hanya berakhir di CLI saja, tapi akan berakhir di browser !

nodejs ini awalnya sudah menyediakan sebuah module yang bernama `http` supaya
kita dapat menghandle output di dalam browser, hanya saja penggunaannya lumayan
*tricky*, sehingga ada orang orang yang berbaik hati, yang membuat framework
untuk mempermudah penggunaan `http` nodejs ini, yang tertuang dalam sebuah
framework yang bernama `Express`.

Express merupakan sebuah `framework` pada nodejs yang sangat populer dan 
digunakan untuk membuat aplikasi web (mirip dengan `sinatra` pada `ruby`)

Nah kali ini kita akan mencoba menggunakan framework `Express` tersebut.

Cara membuat sebuah aplikasi web sederhana dengan express:
1. Jalankan `git init`
1. Jalankan `npm init`
1. Pasang module `express` dengan mengetik `npm install express`
1. Tambahkan file `.gitignore` untuk meng-*exclude* folder `node_modules`
1. Buat sebuah file utama (mis: `app.js`)
1. Buat kode untuk menjalankan express seperti di [Code 1](#code-1)
1. Jalankan dengan mengetik `node app.js`

#### Code 1
```javascript
const express = require('express');
const app = express();

// Default port aplikasi express
// Port untuk development jangan di bawah 1024, 
// reserved for system usage (well-known ports)
const PORT = 3000;

// app.listen(port, callback)
// digunakan untuk meng-serve aplikasi web yang dibuat pada port tertentu
app.listen(PORT, () => {
  console.log(`Welcome to express at port ${PORT}`);
});
```

Ketika kita menjalankan kode di atas, pada console akan mengeluarkan output
```
Welcome to express at port 3000
```

Kita bisa membuka aplikasi web yang sudah kita buat pada browser kesayangan 
kita dengan membuka url `localhost:3000`

Namun ketika kita membuka kode di atas, akan muncul output error
```
Cannot get /
```

Mengapa demikian? Hal ini terjadi karena kita belum mengerti cara pakai express!

## How to *expressing* `express`
Dalam menggunakan express, kita harus mendefinisikan rute (atau disebut dengan
`endpoint`) yang akan digunakan oleh aplikasi web kita. cara mendefinisikan rute 
pada app ini berhubungan dengan HTTP methods yang akan digunakan, seperti 
`GET`, `POST`, dsb. untuk full method yang dapat 
digunakan pada express dapat dilihat di tautan 
[ini](https://expressjs.com/en/4x/api.html#app.METHOD)

Namun yang akan digunakan pada pembelajaran ini adalah HTTP method `GET` saja.

Umumnya cara untuk menggunakan express untuk method `GET` ini adalah
dengan cara:

```javascript
...

// Define the endpoint here
// app.get = method get
app.get('/define/endpoint', function (req, res) {
  // Logic for input and output here
  
  // the end
  res.send(theData);
});

...
```

Untuk penggunaan `GET` pada express ini dapat dilihat pada dokumentasi
express di tautan 
[ini](https://expressjs.com/en/4x/api.html#app.get.method)

Setelah kita membaca dokumentasi di atas, kita bisa memodifikasi kode
yang kita buat sebelumnya agar dapat menggunakan method `GET`.

Cara menggunakannya dengan memodifikasi Code 1 dan dapat dilihat pada [Code 2](#code-2)

### Code 2
```javascript
const express = require('express');
const app = express();

const PORT = 3000;

// Di sini kita mendefinisikan penggunaan endpoint '/'
// yang akan meng-handle HTTP GET method
app.get('/', function HTTPGetRootHandler(req, res) {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});
```
Kemudian kita akan menjalankan kode di atas dengan me-`refresh` halaman browser
yang digunakan. 

Tapi mengapa kode kita tidak berjalan dan masih mengeluarkan output 
`Cannot GET /` ?

Hal ini terjadi karena kita belum mematikan aplikasi web yang dibuat, sehingga
masih menggunakan kode yang lama. Untuk menggunakan kode yang baru ini, kita 
harus mematikan aplikasi kita terlebih dahulu (`CTRL + C`) pada terminal, lalu
menjalankan kode nya ulang (`node app.js`) lagi. 

Cukup menyebalkan bukan ?

Sehingga kita akan memasang module tambahan supaya aplikasi bisa auto restart pada saat pengembangan aplikasi web ini.

## How to use `nodemon`
Nah, untuk bisa mendapatkan fitur `auto restart`, kita akan memasang module 
tambahan yang bernama `nodemon`.

Untuk cara memasang nodemon ini ada 2 cara, yaitu dengan menggunakan 
`global package npm` dan dengan menggunakan `npx`, pada pembelajaran kali ini
kita akan menggunakan cara `npx`

Cara memasang module `nodemon` dan menggunakan `npx`:
1. Pasang module `nodemon` dengan `npm install --save-dev nodemon`
2. Jalankan dengan `npx nodemon <nama_file_js>` e.g. `npx nodemon app.js`

Setelah menjalankan ini maka setiap perubahan pada file `app.js`, aplikasi web 
akan langsung `auto restart`, sungguh memudahkan development bukan ?

## Basic express Usage
Pada express, kita bebas menentukan `endpoint` yang kita inginkan dengan nama 
tertentu pada aplikasi web yang akan kita gunakan, mari kita memodifikasi 
Code 2 menjadi [Code 3](#code-3) di bawah ini

### Code 3
```javascript
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
```

Selamat, sampai di sini berarti kita sudah bisa memanfaatkan express untuk
menampilkan output yang kita inginkan ke dalam browser loh !

Jadi setelah ini, pembelajaran kita sudah tidak akan membosankan lagi hanya
dengan melihat tulisan hitam putih saja, namun sudah bisa masuk ke dalam 
browser, yay \o/ !

## Reference
* [About package-lock.json - Coinmonks (Medium)](https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8)
* [Express JS Documentation](https://expressjs.com/en/api.html#express)