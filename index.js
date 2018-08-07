const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
let db = require('./db');

const app = express();
// 
mongoose.connect('mongodb://*********:********@ds111422.mlab.com:11422/subscribers',{ useNewUrlParser: true });

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views',__dirname+'/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/subscribe',(req,res)=>{
    console.log(req.body);
    db.saveUser(req.body, (err, success) => {
        if(err)
            res.send(err);
        else
            res.render('success',{name:req.body.name,email:req.body.email});
      });
    // console.log(req.headers);    
});

app.listen(port,()=>{
    console.log(`server is live at port: ${port}`);
})
