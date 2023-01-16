const express = require('express')
const app = express()
app.use(express.json())
const accessories = [
    {
      "product": "Laptop",
      "price": 27,
      id: 1
    },
    {
      "product": "Charger",
      "price": 32,
      id: 2
    },
    {
      "product": "Mobile Phone",
      "price": 45,
      id: 3
    }
  ] 
  app.get('/',(req, resp)=>{
    resp.send('Here you will get the following accessories')
})
app.get('/api/accessories',(req,resp)=>{
    resp.send(accessories)
})
app.listen(8080)
   