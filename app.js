const express=require("express");
const path=require("path");
const body=require("body-parser");
const fs=require("fs");
const app=express();
const port=80;
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
mongoose.connect('mongodb://localhost:27017/dance');
}
//define mongoose schema
const dance = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    email: String
  });  
  //define model
const dm = mongoose.model('dm', dance);
app.use('/static', express.static('static'));//Express specific stuff
app.use(express.urlencoded())
//pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
//End points

app.get('/',(req,res)=>{
    const params={}
    res.status(202).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={}
    res.status(202).render('contact.pug',params);
});
app.post('/contact',(req,res)=>{
    var mydata=new dm(req.body);
    mydata.save().then(()=>{
        res.send("data is saved")
    }).catch(()=>{
        res.status(404).send("Item is not saved");
    });
})

app.listen(port,()=>{
    console.log(`The application is started on port ${port}`);
});