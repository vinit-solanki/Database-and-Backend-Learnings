// require mongooes
const mongoose  = require('mongoose');
// Connect to database
const uri = "mongodb://localhost:27017/IMdb";
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error("Connection Error: ", err));
// Create db schema
const movieSchema = new mongoose.Schema({
    title: String,
    releaseYear: Number,
    genres: [String],
    director: String,
    cast: [Object],
    rating: Number,
    boxOffice: Object,
    runtime: Number,
    description: String,
});
// create model
const Movie = mongoose.model('movie', movieSchema);
// CRUD Operations:
const main = async () => {
    try {

        // Read: 
        const movies = await Movie.find();
        console.log("Movies: ", movies);
        const data = {
            title: "Dune 2",
            releaseYear: 2024,
            genres: ["Action","Thriller","Fantasy","Sci-fi"],
            director: "Dennis Villanueva",
            cast: ["Rebecca Feguisan","Timmothi Chamllete","Zendaya"],
            rating: 9.2,
            boxOffice: { global: "253M$" },
            runtime: 3.16,
            description: "An Absolute cinema based on the mythological and sci-fi book of the world of dune"
        }

        // Create: 
        // const newMovie = new Movie(data);
        // await newMovie.save();
        // console.log("New Movie Added: ", newMovie);
        
        // Update:
        await Movie.updateOne({ title: 'Dune 2' }, { $set: { boxOffice: { budget: 1800000, revenue: 20000000} } })
        console.log("Update the boxOffice for Dune two");
        
        // Delete:
        // await Movie.deleteOne({ title: 'Dune 2' });
        // console.log("Deleted the copy of Dune 2");    
        
        // Get the top 3 movies:
        const top3 = await Movie.find({ rating: { $gte: 8.5 } });
        console.log("Top 3 Movies: ", top3);
        
    } catch (err) {
        console.error("Error: ", err);
    } finally {
        mongoose.connection.close();
        console.log("Disconnected from MongoDB...");
    }
}
main();

