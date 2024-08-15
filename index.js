const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError")

app.set("views",path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

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

app.get("/chats", async (req,res)=>{
    try {
        let chats =  await Chat.find()
        console.log(chats)
        res.render("index.ejs",{chats});
    }
    catch(err){
        next(err);
    }
})

//New route
app.get("/chats/new", (req,res)=>{
    // throw new ExpressError(404, "Page Not found");
    res.render("new.ejs")
})

//create route
app.post("/chats", (req, res)=>{
    try {
        let {from, to, msg} = req.body;
        let newChat = new Chat({
            from: from,
            to : to,
            msg: msg,
            created_at: new Date(),
    
        })
        console.log(newChat);
        
        newChat.save()
        .then((res)=>{
            console.log("Chat was saved.")
        })
        .catch((err)=>{
            console.log(err);
        })
    
        res.redirect("/chats")
    } catch(err){
        next(err);
    }

})


function asyncWrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err));
    }
}


// NEW - Show Route;
app.get("/chats/:id", async(req, res, next)=>{
    try {
        let { id } = req.params;
        let chat =  await  Chat.findById(id);
        if(!chat){
            next( new ExpressError(404, "Chat not found.") );
        }
        res.render("edit.ejs", { chat })
    }
    catch(err){
        next(err);
    }
})

//Edit route
app.get("/chats/:id/edit", async (req,res)=>{
    try {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", {chat})
    }
    catch(err){
        next(err);
    }
})

//Update route
app.put("/chats/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let { msg: newMsg} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg}, {runValidators: true, new: true});
        console.log(updatedChat);
        res.redirect("/chats")
    }
    catch(err){
        next(err)
    }
})

//Destroy route
app.delete("/chats/:id", async(req, res)=>{
    try{
        let {id} = req.params;
    
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        console.log(id);
        res.redirect("/chats")
    }
    catch(err){
        next(err);
    }

})

app.get("/",(req,res)=>{
    res.send(" root is working ")
})

//ERROR Handling middleware
app.use((err, req, res, next)=>{
    let {status=500, message="Some ERROR occured"} = err;
    res.status(status).send(message);
})

app.listen(8085, ()=>{
    console.log("server is listening on port 8085")
});
