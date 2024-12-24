const mongoose = require("mongoose");

// MongoDB URI for the 'Ecommerce' database
const uri = "mongodb://localhost:27017/Ecommerce";

// Define the schema matching the 'Products' collection
const productSchema = new mongoose.Schema({
  name: String, // Name of the product
  category_id: String, // Category ID as string
  price: Number, // Price of the product
  stock: Number, // Stock count
  rating: Number, // Product rating
  manufactur_date: Date, // Manufacturing date as Date
  specification: {
    screen_size: String,
    ram: String,
    storage: String,
  },
});

// Use the existing 'Products' collection
const Product = mongoose.model("Product", productSchema, "Products");

// Main function
const main = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Fetch data from the 'Products' collection
    const data = await Product.find({});
    console.log("Products:", data);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Disconnect MongoDB
    console.log("Disconnecting MongoDB...");
    mongoose.connection.close();
  }
};
// main();

// Update 
const updateProduct = async (name)=>{
  try{
    await mongoose.connect(uri);
    await Product.updateOne({name: name},{ $set: { price: 1310.00 } });
  } catch(err){
    console.log(err);
  } finally{
    mongoose.connection.close();
  }
}
// updateProduct('Laptop');

const getProduct = async (name)=>{
  try{
    await mongoose.connect(uri);
    const data = await Product.find({ name: name });
    console.log(data);
  } catch(err){
    console.error(err);
  } finally{
    mongoose.connection.close();
  }
}
getProduct('Laptop');