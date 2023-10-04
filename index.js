const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const mongodb = require('./db/Schema');
const url = 'mongodb://127.0.0.1:27017/database_crudapp';
const app = express()
const cors = require('cors')
app.use(cors())
app.use(bodyparser.json())
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// cors for cross origin

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(
        () => {
            console.log("server Connection successfully");
        },
        (error) => {
            console.log("Error :", error);
        }
    );

app.listen(8086, function check(error) {
    if (error)
        console.log(error)

    else
        console.log("port is connected")
});

//Registration  Post 
app.post('/register', (req, res) => {
    const data = new mongodb({
        title: req.body.title,
        content: req.body.content,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        category_id: req.body.category_id
    })
    
    
 
    data.save().then((data) => {
        res.send(data)
        console.log("data is created");
    }).catch((e) => {
        console.log('not saved :', e)
        console.log("data is not created");
    })

})

app.delete('/delete/:id', (req, res) => {
    mongodb.findByIdAndRemove(req.params.id).then((data) => {
        if(data._id==null){
            console.log("Data not found!");
        }else{
          console.log("data is Deleted!");
          res.send(data);
        } 
        
    }).catch((e) => {
        res.send(e)
        console.log("data is not found");
    })
})


app.patch('/update/:_id', (req, res) => {
    mongodb.findByIdAndUpdate(req.params._id, { $set: req.body }).then((data) => {
        res.send(data)
        console.log("Data is updated");
    }).catch((e) => {
        res.send('cant updates due to :', e)
        console.log("data can't updated");
    })
})


app.get('/Read', (req, res) => {
    mongodb.find().then((data) => {
        res.send(data)
        console.log("All data found");
    }).catch((e) => {
        res.send('not found all data', e)
        console.log("All data is not found");
    })
})   