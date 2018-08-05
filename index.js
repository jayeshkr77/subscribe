const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let db = require('./db');

const app = express();
// mongodb://*******:*******@ds111422.mlab.com:11422/subscribers
mongoose.connect('mongodb://teqsk1514:iamravi14@ds211592.mlab.com:11592/userdata',{ useNewUrlParser: true });

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/subscribe',(req,res)=>{
    console.log(req.body);
    db.saveUser(req.body, (err, success) => {
        if(err)
            res.send(err);
        else
            res.send("success");
      });
    // console.log(req.headers);    
});

app.listen(port,'127.0.0.1',()=>{
    console.log(`server is live at port: ${port}`);
})
