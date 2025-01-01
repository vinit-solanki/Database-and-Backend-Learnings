const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Don't forget this!
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const Product = require('./models/product');

const mongoose = require("mongoose");
const { error } = require("console");
mongoose
.connect("mongodb://localhost:27017/farmStand")
  .then(() => console.log("Connected with Mongodb..."))
  .catch((err) => console.log(err))

const categories = ['fruit','vegetable','cereal','ice-cream','chocolate','beauty','fashion'];

app.get('/',async (req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products});
})
app.get('/products', async (req, res) => {
    const { category } = req.query; // Use req.query to get the category from the query string
    let products;

    try {
        if (category) {
            // Find products that match the selected category
            products = await Product.find({ category });
        } else {
            // If no category is selected, find all products
            products = await Product.find({});
        }
        res.render('products/index', { products }); // Render the products index page with the filtered products
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        } 
        res.render('products/show', {product});
    } catch (error) {
        console.error(error);
        res.status(400).send('Invalid ID format');
    }
});
app.get('/product/new',(req,res)=>{
  // res.send("New Product")
  res.render('products/new');
})
app.post('/products', async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire request body
    // Ensure onSale is a boolean
    req.body.onSale = req.body.onSale === 'on'; // Convert string "on" to true, anything else to false

    // Create a new product instance
    const product = new Product(req.body);
    
    try {
        await product.save(); // Save the product to the database
        res.redirect(`/products/${product._id}`); // Redirect to the new product's show page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving product'); // Handle errors
    }
});
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        // Ensure valid dates
        product.manufactureDate = product.manufactureDate || null;
        product.expirationDate = product.expirationDate || null;
        res.render('products/edit', { product, categories});
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching product');
    }
});


app.put('/products/:id', async (req, res) => {
    console.log('Request Body:', req.body); // Debugging
    const { id } = req.params;

    // Process fields before updating
    req.body.onSale = req.body.onSale === 'on';
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.redirect(`/products/${updatedProduct._id}`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating product');
    }
});
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        console.log("Deleted Product:", deletedProduct);
        res.redirect('/products'); // Redirect to the products list after deletion
    } catch (err) {
        console.error(err);
        res.status(400).send('Error deleting product');
    }
});
app.listen(3000,()=>console.log('Server Started...'));
