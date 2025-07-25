let express=require("express");
let app =express();
const mongoose=require("mongoose");
const path=require("path");
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

const Chat=require("./models/chat.js")

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}

main().then(()=>{
    console.log("connected to database");
}).catch(err => console.log(err));




app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})

app.get("/",(req,res)=>{
    res.send("Server is listening to mongo db database");
})

app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});

})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    
    let { from, msg, to } = req.body;
    
    let result = new Chat({
    from: from,    
    to: to,
    msg: msg,
    created_at: new Date()
    });

    result.save().then((res)=>{
        console.log(res);
    })
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    
    res.render("edit.ejs",{chat});
})

//Update route

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg :newMsg}=req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Delete route

app.delete("/chats/:id",async (req,res)=>{
     let {id}=req.params;
     let deletedChat=await Chat.findByIdAndDelete(id);
     console.log(deletedChat);
     res.redirect("/chats");

})