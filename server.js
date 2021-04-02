import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//app config
const app=express();
const PORT=process.env.PORT||8001;
const connection_url='mongodb+srv://tinder:tinder123@cluster0.9qi7q.mongodb.net/tinderDB?retryWrites=true&w=majority'; 
//middlewares
app.use(express.json());
app.use(Cors());
//DB config
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//Api Endpoints
app.get("/",(req,res)=>{
    res.status(200).send("hello");
});
app.post("/tinder/card",(req,res)=>{
    const dbCard=req.body;
Cards.create(dbCard,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(201).send(data);
    }
});

});
app.get("/tinder/card",(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    }); 
})

//listener
app.listen(PORT,()=>{
    console.log('this is app');
});