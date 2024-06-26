const express = require('express')
const app = express();
const path = require('path');
const userModel =require('./models/user');
const user = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=>{
    res.render('index')
})

//create user

app.post('/create', async (req,res)=>{
    let {name , email , image} = req.body; // destructring
    const users = await userModel.create({
        name,
        email,
        image,
    })
    res.redirect("/read")
})

//read user

app.get('/read', async (req,res)=>{
    let users = await userModel.find();
    res.render('read', {users})
})
app.get('/edit/:userid', async (req,res)=>{
    let user = await userModel.findOne({_id:req.params.userid});
    res.render('edit',{user});
})
app.post('/update/:userid', async (req,res)=>{
    let {name , email , image} = req.body; // destructring
    await userModel.findOneAndUpdate({_id:req.params.userid},{name , image , email},{new:true})
    res.redirect('/read')
})
app.get('/delete/:userid', async (req,res)=>{
    let users = await userModel.findOneAndDelete({_id:req.params.userid})
    res.redirect("/read")
})
app.listen(3000);
