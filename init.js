const mongoose=require("mongoose");
const Chat=require("./models/chat.js")


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}

main().then(()=>{
    console.log("connected to database");
}).catch(err => console.log(err));

let allChats=([{
    from:"yash",
    to:"shlok",
    msg:"Lets go to ahemdabad",
    created_at:new Date()},
{
    from:"Levis",
    to:"souled store",
    msg:"I am a better jeans brand",
    created_at:new Date(),

},
{
    from:"amazon",
    to:"flipkart",
    msg:"I have a huge product market than you",
    created_at:new Date(),

},
{
    from:"myntra",
    to:"ajio",
    msg:"I have a better fashion sense than you",
    created_at:new Date(),

},
{
    from:"OpenAI",
    to:"Google",
    msg:"Chatgpt will always be better than Gemini",
    created_at:new Date(),

}])

Chat.insertMany(allChats);
