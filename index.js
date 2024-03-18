const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//CORS CONFIG FILE
const corsConfig = {
  origin: ["http://localhost:5173", "https://padma-server.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// middleware
app.use(cors());
app.use(express.json());
app.use(cors(corsConfig));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e9we0w0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    /////////////////////////////////////
    //           all collection        //
    /////////////////////////////////////

    const productCollection = client
      .db("PadmaEcommerceDB")
      .collection("allProducts");

    app.get("/get-all-categories-product", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.get("/get-single-product-details/:id", async (req, res) => {
      const id = req.params.id;
      const allProducts = await productCollection.find().toArray();
      let product = {};
      allProducts.map(singleProduct =>
        singleProduct.products.map(pdt => {
          if (pdt["product-id"] === id) {
            product = pdt;
          }
        })
      );
      res.send(product);
    });

    /*   app.get("/get-single-product-details/:id", async (req, res) => {
      const productId = req.params.id;

      try {
        const allProducts = await productCollection.find().toArray();
        const x = allProducts.map(singleProduct =>
          //   console.log(singleProduct.products)
          singleProduct.products.map(xx => {
            // console.log(xx);
            return xx;
          })
        );
        console.log(x);


        // const product = await productCollection.findOne({
        //   _id: new ObjectId(productId),
        // });

        // if (!product) {
        //   return res.status(404).json({ message: "Product not found" });
        // }

        // res.json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }); */

    // ///// Task api ///////////

    /* app.post("/create-task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.get("/all-task/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new did) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });

    app.patch("/task/update/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      console.log(data);
      const updatedDoc = {
        $set: data,
      };
      console.log(updatedDoc);
      const result = await taskCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/task/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
 */
    /////////////////////////////////////
    //            api                  //
    /////////////////////////////////////

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Padma Server Running Now on Port: ${port}`);
});
