// Import MongoDB client
const { MongoClient, ObjectId } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'Ecommerce'; //  database name

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectDB() {
  try {
    // Connect to MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');
    // Get the database
    const db = client.db(dbName);
    console.log(`Connected to the database: ${dbName}`);
    // interact with the database, for example:
    const collection = db.collection('Products');
    const documents = await collection.find().toArray();
    console.log(documents);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Disconnect with the Mongodb Server
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

// connectDB();

async function insertProduct() {
  const db = client.db(dbName);
  const products = db.collection('Products'); // Access the 'products' collection
  const product = {
    _id: '106',
    name: 'Lenovo Ideapad Slim 1 Laptop',
    category_id: '5',
    price: 1200,
    stock: 25,
    manufacture_date: new Date('2021-06-15'),
    specifications: { color: 'Gray', ram: '16GB', storage: '512GB' }
  };
  const result = await products.insertOne(product); // Insert a single document
  console.log(`Inserted product with _id: ${result.insertedId}`);
}

// insertProduct();

async function getProductById(id) {
  try {
    const db = client.db(dbName);
    const products = db.collection('Products'); // Note: Use consistent capitalization
    // Query for a numeric `_id`
    const product = await products.findOne({ _id: `${id}` });
    console.log("Product Found:\n",product);
  } catch (err) {
    console.error('Error fetching product:', err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}
getProductById(105);

const deleteOutOfStock = async ()=>{
  try{
    const db = client.db(dbName);
    const products = db.collection('Products');
    const deleteItems = await products.deleteMany({ stock: 0 });
    if(deleteItems.deletedCount===0){
      console.log("No Empty Stock.");
    } else{
      console.log(`${deleteItems.deletedCount} Items deleted.`);
    }
  } catch(err){
    console.log("Some Error has occured: ",err);
  } finally{
    console.log("Disconnecting Databse...");
    client.close();
  }
}
// deleteOutOfStock();

// Update product by id
const updateProduct = async (id)=>{
  try{
    const db = client.db(dbName);
    const products = db.collection('Products');
    const product = await products.findOne({ _id: `${id}` });
    console.log("Product:", product);
    await products.updateOne({ _id: `${id}` },{$set:{ rating: 3.7 }});
  } catch(err){
    console.error("Error:",err);
  } finally{
    console.log("Disconnecting DB...");
    client.close();
  }
}
// updateProduct(105);