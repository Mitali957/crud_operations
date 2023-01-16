const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(express.json())
var database
app.get('/',(req,resp)=>{
    resp.send('welcome to mongodb api')
})

app.get('/api/Accessories',(req, resp) => {
    console.log("req received")
    database.collection('Accessories').find({}).toArray((err, result) => {
        console.log(result)
        if(err) throw err
        resp.send(result)
    })
})

app.post('/api/Accessories/addAccessory', (req,resp)=>{
   let res= database.collection('Accessories').find({}).sort({id:-1}).limit(1)
   res.forEach(obj=>{
if(obj){
    let Accessory ={
        id: obj.id +1,
        name: req.body.name
    }
    database.collection('Accessories').insertOne(Accessory, (err, result) =>{
        if(err) resp.status(500).send(err)
        resp.send("Added Successfully")
    })
}
})
})
app.put('/api/Accessories/:id',(req, resp) => {
    let Accessory = {
         id: parseInt(req.params.id),
         name: req.body.name
     }
     database.collection('Accessory').updateOne(
         {id: parseInt(req.params.id)}, 
         {$set: Accessory}, (err, result) =>{
         if(err) throw err
         resp.send(Accessory)
     })
 })
 app.delete('/api/Accessories/:id', (req, resp) => {
    database.collection('Accessories').deleteOne({id: parseInt(req.params.id)}, (err, result) =>{
        if(err) throw err
        resp.send('Accessory is deleted')
    })
})
 

app.listen(8080, ()=>{
    MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true}, (error, result) =>{
        if(error) throw error
        database = result.db('admin')
        console.log('connection successful')
    })
    
})

   