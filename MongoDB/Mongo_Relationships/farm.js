const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
.then(()=>console.log("Connected with Mongodb"))
.catch(err=>console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring','Summer','Fall','Winter']
    }
})
const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}) 

const Product = mongoose.model('Product',productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Brijol', price: 4.99, season: 'Fall' },
//     { name: 'Cauliflower', price: 2.99, season: 'Spring'},
//     { name: 'Cabbage', price:1.99, season: 'Summer'} 
// ]);

// const makeFarm = async ()=>{
//     const farm = new Farm({ name: 'New Yadav Dairy and Farm', city: 'Borivali, Mumbai' });
//     const cabbage = await Product.findOne({name: 'Cabbage'});
//     farm.products.push(cabbage);
//     await farm.save();
//     console.log(farm);    
// }
// makeFarm();

const addProduct = async (farmName, productName)=>{
    const farm = await Farm.findOne({ name: farmName });
    const product = await Product.findOne({ name: productName });
    if (farm && product) {
        farm.products.push(product);
        await farm.save();
    }
    console.log(farm, product);    
}

Farm.findOne({ name: 'New Yadav Dairy and Farm' })
.populate('products')
.then(farm => console.log(farm));