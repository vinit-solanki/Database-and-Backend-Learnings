const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: ", err))
  .finally(() => {
    console.log("Disconnecting MongoDB...");
    mongoose.close();
  });

const productSchema = new mongoose.Schema({
    name: String,
    category_id: String,
    price: Number,
    stock: Number,
    rating: Number,
    manufactur_date: Number,
    specification: {
        screen_size: String,
        ram: String,
        storage: String,
    }
})

const Product = mongoose.model('Product: ',productSchema);
