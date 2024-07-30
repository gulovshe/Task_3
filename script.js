const express=require("express")
const mongoose=require("mongoose")
const cors = require('cors')
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
dotenv.config()
const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors())


mongoose.connect(process.env.db_connection)
.then(res=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
    
})



const CategorySchema=new mongoose.Schema({
    name:String,
    price:Number
})

const CategoryModel=mongoose.model("Category",CategorySchema)



app.get("/categories",async(req,res)=>{
    let categories=await CategoryModel.find()
    res.send(categories)
   

})
app.post("/categories",async (req,res)=>{
    let newCategory=new CategoryModel(req.body)
    await newCategory.save()
    res.send(newCategory)
})

app.delete("/categories/:id", async (req,res)=>{
    let id=req.params.id
    let deleted= await CategoryModel.findByIdAndDelete(id)
    res.send(deleted)
})

app.listen(7777,()=>{
    console.log("7777 portunda isleyir")
})
