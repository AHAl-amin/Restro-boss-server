const express = require('express')
const app = express();
require('dotenv').config()
const cors =require('cors');
const port =process.env.PORT || 5000;

// middle wire

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ye8t7hu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection =client.db('RestroDB').collection('menu')
    const reviewCollection =client.db('RestroDB').collection('reviews')
    const cardsCollection =client.db('RestroDB').collection('cards')


    app.get('/menu',async(req,res) =>{
        const result =await menuCollection.find().toArray();
        res.send(result)
    })

    app.get('/reviews',async(req,res) =>{
        const result =await reviewCollection.find().toArray();
        res.send(result)
    })

    // card collections

    app.get('/carts',async(req,res) =>{
      const email =req.query.email;
      const query ={email:email}
      const result = await cardsCollection.find(query).toArray();
      res.send(result);
    })
    app.post('/carts',async(req,res) =>{
      const cartItem =req.body;
      const result = await cardsCollection.insertOne(cartItem)
      res.send(result)
    })

    app.delete('/carts/:id',async (req , res) =>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
      const result = await cardsCollection.deleteOne(query)
      res.send(result);
      
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) =>{
    res.send('Restro is setting')
})
app.listen(port,() =>{

    console.log(`Restro boss is sitting on ${port}`)
})