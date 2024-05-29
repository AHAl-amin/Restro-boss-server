const express = require('express')
const app = express();
const cors =require('cors');
const port =process.env.PORT || 5000;

// middle wire

app.use(cors());
app.use(express.json());

app.get('/',(req,res) =>{
    res.send('Restro is setting')
})
app.listen(port,() =>{

    console.log(`Restro boss is sitting on ${port}`)
})