const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require('method-override');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Database connected");
  }).catch(err => {
    console.error("Connection error", err);
});  

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected...");
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
  console.log("YelpCamp Started!");
  res.render("home");
});
// app.get("/makecampground", async (req, res) => {
//   const camp = new Campground({
//     title: "My Balcony",
//     price: "$33/night",
//     location: "Mulund",
//     description: "Only 2 people allowed",
// });
//   try {
//     await camp.save();
//     res.send(camp);
//   } catch (error) {
//     console.error("Error saving campground:", error);
//     res.status(500).send("Error saving campground");
//   }
// });
app.get('/campgrounds', async (req,res)=>{
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index',{campgrounds});
})
app.get('/campgrounds/new', async (req,res)=>{
  res.render('campgrounds/new');
});
app.get('/campgrounds/:id', async (req,res)=>{
  const {id} = req.params;
  const camp = await Campground.findById(id);
  res.render('campgrounds/show',{camp});
});
app.post('/campgrounds', async (req,res)=>{
  try{
    const campground = new Campground(req.body.campground);
    console.log("New Camp:", campground);  
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
  } catch(err){
    console.error("Error:", err);    
  }
});
app.get('/campgrounds/:id/edit', async (req,res)=>{
  try{
    const {id} = req.params;
    const camp = await Campground.findById(id);
    res.render('campgrounds/edit',{camp});
  } catch(err){
    console.error("Error:",err);    
  }
})
app.put('/campgrounds/:id', async (req,res)=>{
  const {id} = req.params;
  const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
  console.log(req.body);  
  console.log(camp);   
  res.redirect(`/campgrounds/${id}`);
})
app.delete('/campgrounds/:id', async (req,res)=>{
  const {id} = req.params;
  try{
    const camp = await Campground.findByIdAndDelete(id);
    console.log("Deleted Campground: ",camp);
    res.redirect('/campgrounds');
  } catch(err){
    console.error("Error: ",err);    
  }
})

app.listen(3000, () => console.log("Server Started..."));
