const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mahasiswa = require("./mahasiswa");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route untuk halaman utama
app.get("/", (req, res) => {
  res.render("index");
});

// Route untuk menampilkan halaman profile
app.get("/profile", (req, res) => {
  const dataMahasiswa = [
    {
      name: "Diah Munica Nawang",
      nim: "V3922015",
      address: "Magetan, Jawa Timur",
    },
  ];
  res.render("profile", { mahasiswa: dataMahasiswa });
});

// Route untuk menampilkan halaman list mahasiswa
app.get("/mahasiswa", (req, res) => {
  const allMahasiswa = mahasiswa.getAllMahasiswa();
  res.render("list-mahasiswa", { mahasiswa: allMahasiswa });
});

// Route untuk hapus data mahasiswa
app.delete("/mahasiswa/delete/:id", (req, res) => {
  const id = req.params.id;
  mahasiswa.deleteMahasiswa(id);
  res.redirect("/mahasiswa");
});

// Route untuk update data mahasiswa
app.put("/mahasiswa/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedMahasiswa = {
    id: id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address,
  };
  mahasiswa.updateMahasiswa(updatedMahasiswa);
  res.redirect("/mahasiswa");
});

// Route untuk tambah data mahasiswa
app.post("/mahasiswa/insert", (req, res) => {
  const newMahasiswa = {
    id: req.body.id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address,
  };
  mahasiswa.insertMahasiswa(newMahasiswa);
  res.redirect("/mahasiswa");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require('express')
// const app = express()
// const port = 3001
// const user = require('./user');
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send("Hello World from API from GET")
// })

// // METHOD GET
// app.get('/api/v1/users', (req, res) => {
//     console.log(req.query, 'THIS IS FROM REQUEST QUERY???')
//     const result = user.getAllUser(req.query)
//     res.send({
//         data: result.data
//     });
// })

// // METHOD GET untuk certain id
// app.get('/api/v1/users/:id', (req, res) => {
//     const result = user.getUserById(req.params.id)
//     res.send({
//         data: result
//     })
// })

// // METHOD untuk insert data
// app.post('/api/v1/users', (req, res) => {
//     const result = user.insertNewData(req.body)
//     res.send({
//         data: result
//     });
// })

// app.put('/api/v1/users/:id', (req, res) => {
//     const result = user.updateData(req.params.id, req.body)
//     res.send({
//         data: result
//     });
// })

// app.delete('/api/v1/users/:id', (req, res) => {
//     const result = user.deleteData(req.params.id)
//     res.send({
//         data: result
//     });
// })

// // app.put('/', (req, res) => {
// //     res.send("Hello World from API from PUT")
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
