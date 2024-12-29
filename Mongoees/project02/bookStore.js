const mongoose = require("mongoose");
// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017/bookstore";
// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB using Mongoose!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Author Schema and Model
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});
const Author = mongoose.model("Author", authorSchema);

// Define Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  publisher: {
    name: { type: String },
    address: { type: String },
  },
});

const Book = mongoose.model("Book", bookSchema);

// Function to perform operations
async function run() {
  try {
    await Author.deleteMany({});
    await Book.deleteMany({});

    // 1. Create Authors
    const authors = await Author.insertMany([
      { name: "George Orwell", age: 46 },
      { name: "J.K. Rowling", age: 57 },
    ]);
    console.log("Authors added:", authors);

    // 2. Create Books
    const books = await Book.insertMany([
      { title: "1984", author: authors[0]._id, genre: "Dystopian", price: 9.99 },
      { title: "Animal Farm", author: authors[0]._id, genre: "Political Satire", price: 7.99 },
      { title: "Harry Potter", author: authors[1]._id, genre: "Fantasy", price: 19.99 },
    ]);
    console.log("Books added:", books);

    // 3. Query Books (Read)
    const allBooks = await Book.find().populate("author");
    console.log("All Books:", allBooks);

    const specificAuthorBooks = await Book.find({ author: authors[0]._id }).populate("author");
    console.log("Books by George Orwell:", specificAuthorBooks);

    // 4. Update a Book (Update)
    const updatedBook = await Book.findOneAndUpdate(
      { title: "1984" },
      { price: 11.99 },
      { new: true } // Returns the updated document
    );
    console.log("Updated Book:", updatedBook);

    // 5. Delete a Book (Delete)
    const deletedBook = await Book.findOneAndDelete({ title: "Animal Farm" });
    console.log("Deleted Book:", deletedBook);

    // 6. Aggregation (Total Sales per Author)
    const salesAggregation = await Book.aggregate([
      {
        $lookup: {
          from: "authors", // Collection name (lowercase of Author model)
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" },
      {
        $group: {
          _id: "$authorDetails.name",
          totalSales: { $sum: "$price" },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);
    console.log("Sales Aggregation:", salesAggregation);

    // 7. Add Embedded Publisher to a Book
    const newBook = await Book.create({
      title: "New Book",
      author: authors[1]._id,
      genre: "Adventure",
      price: 12.99,
      publisher: {
        name: "Penguin Random House",
        address: "New York",
      },
    });
    console.log("Added Book with Publisher:", newBook);

  } catch (err) {
    console.error("Error during operations:", err);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed.");
  }
}
run();
