const express = require("express");
const { MongoClient } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rzfie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const productsCollection = client.db("foodShop").collection("products");
  const ordersCollection = client.db("foodShop").collection("orders");

  app.post("/addProduct", (req, res) => {
    console.log(req.body);
  });
});

app.get("/", (req, res) => {
  res.send("Running Food server");
});

app.get("/hello", (req, res) => {
  res.send("Hello updated here.");
});

app.listen(port, () => {
  console.log("Running Food Server on Port", port);
});
