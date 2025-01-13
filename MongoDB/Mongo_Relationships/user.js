const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
.then(()=>console.log("Connected with Mongodb"))
.catch(err=>console.log(err));

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [{
        street: String,
        city: String,
        state: String,
        country: String,
    }]
})

const User = mongoose.model('User',userSchema);

const makeUser = async ()=>{
    const u =new User({
        first: 'Jim',
        last: 'Thomas',
        address:{
        street: '87 2nd St.',
        city: 'Miami',
        state: 'Florida',
        country: 'USA'
        }
    })
    const res = await u.save();
    console.log(res);    
}
// makeUser();

const addAddress = async (id)=>{
    const newAdress = {
        street: '97 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    }
    const user = await User.findById(id);
    user.address.push(newAdress);
    const res = await user.save();
    console.log("Address Added:", res);    
}
addAddress('6783550859efd7d97c3cae41');