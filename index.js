const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
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
    productsCollection.insertOne(req.body).then((result) => {
      res.send(result.insertedId);
    });
  });

  //get all products
  app.get("/products", async (req, res) => {
    const result = await productsCollection.find({}).toArray();
    res.send(result);
  });

  //delete  product

  app.delete("/deleteProduct/:id", async (req, res) => {
    const result = await productsCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.send(result);
  });

  //get single product
  app.get("/singleProduct/:id", (req, res) => {
    console.log(req.params.id);
    productsCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, results) => {
        console.log(results);
        res.send(results[0]);
      });
  });

  //update product
  app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const updatedName = req.body;
    const filter = { _id: ObjectId(id) };

    productsCollection
      .updateOne(filter, {
        $set: {
          name: updatedName.name,
        },
      })
      .then((result) => {
        res.send(result);
      });
  });

  //add order products
  app.post("/addOrder", (req, res) => {
    console.log(req.body);
    ordersCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });
  //get my order

  app.get("/myOrders/:email", async (req, res) => {
    const result = await ordersCollection
      .find({ email: req.params.email })
      .toArray();
    res.send(result);
  });
  //end
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
