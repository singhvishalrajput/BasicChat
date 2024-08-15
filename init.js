const mongoose = require('mongoose');
const Chat = require("./models/chat.js")


main()
.then((res)=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp')
}

let allChats = [
    {
        from: "neha",
        to: "priya",
        msg: "come soon as possible.",
        created_at: new Date()
    },
    {
        from: "john",
        to: "doe",
        msg: "are you coming to the meeting?",
        created_at: new Date()
    },
    {
        from: "alice",
        to: "bob",
        msg: "happy birthday!",
        created_at: new Date()
    },
    {
        from: "mike",
        to: "lucy",
        msg: "let's catch up over coffee.",
        created_at: new Date()
    },
    {
        from: "sarah",
        to: "emma",
        msg: "did you finish the project?",
        created_at: new Date()
    }

]

Chat.insertMany(allChats)

