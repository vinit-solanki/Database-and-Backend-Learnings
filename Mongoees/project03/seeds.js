const Product = require("./models/product");
const mongoose = require("mongoose");

const data = [
  {
    name: "Mango",
    price: 199,
    onSale: true,
    manufactureDate: "31-05-24",
    expirationDate: "5-06-24",
    category: "fruit",
  },
  {
    name: "Potato",
    price: 99,
    onSale: false,
    manufactureDate: "01-06-24",
    expirationDate: "15-06-24",
    category: "vegetable",
  },
  {
    name: "Cornflakes",
    price: 49,
    onSale: true,
    manufactureDate: "10-06-24",
    expirationDate: "30-06-24",
    category: "cereal",
  },
  {
    name: "Vanilla",
    price: 149,
    onSale: false,
    manufactureDate: "20-06-24",
    expirationDate: "10-07-24",
    category: "ice-cream",
  },
  {
    name: "Dark Chocolate",
    price: 199,
    onSale: true,
    manufactureDate: "01-07-24",
    expirationDate: "31-07-24",
    category: "chocolate",
  },
];

// const p = new Product(data)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

const addProducts = async (data)=>{
    await mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log('Connected with Mongodb...');
        return Product.insertMany(data);        
    })
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
    .finally(()=>{
        mongoose.connection.close();
        console.log("Disconnected with Mongodb..."); 
    })
}
addProducts(data);