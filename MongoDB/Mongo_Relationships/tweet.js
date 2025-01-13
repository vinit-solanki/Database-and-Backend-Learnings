const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
.then(()=>console.log("Connected with Mongodb"))
.catch(err=>console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
})
const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}) 

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async ()=>{
    const user = new User({ username: '100xdev', age:31 });
    const tweet1 = new Tweet({ text: 'MERN Stack is not dead!', likes: 13000 });
    tweet1.user = user;
    user.save();
    tweet1.save();
}
// makeTweets();
const addTweets = async (username,content,likes)=>{
    const user = await User.findOne({username});
    const tweet = new Tweet({text: content, likes: likes});
    tweet.user = user;
    tweet.save();
}
// addTweets('100xdev','Learn AI Agents in 2025!',12000);
const findTweet = async()=>{
    const tweet = await Tweet.findOne({}).populate('user','username');
    console.log(tweet);    
}
// findTweet();  