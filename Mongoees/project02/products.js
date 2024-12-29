const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/shopApp";

mongoose
  .connect(uri)
  .then(() => console.log("Connecting MongoDB."))
  .catch((e) => console.log("Error: ", err))
  .finally(() => {
    mongoose.connection.close();
    console.log("Disconnected MongoDB...");
  });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 40,
        minLength: 5,
    },
    category_id: String,
    price: Number,
    manufacture_date: String,
    review: String
  });

const Product = new mongoose.model('products',productSchema);

