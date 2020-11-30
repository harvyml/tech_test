const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const bodyParser = require("body-parser")
const axios = require("axios")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//connecting to database
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//mongoose models
const Url = require("./models/url")


app.post("/preshorten", async (req, res) => {
    const {url} = req.body
    let found_url = Url.findOne({url})
    found_url.then(async snap => {
        if(snap){
            res.json(snap)
        }else{
            let available_urls = await Url.find()
            let length_of_url_to_generate = (available_urls.length/10)+1
            let new_url = generate(length_of_url_to_generate)
            console.log("length: ", length_of_url_to_generate, new_url)
            //after
            let currentDate = new Date().getTime()
            let new_url_obj = new Url({
                _id: new mongoose.Types.ObjectId,
                url,//passed it this way because they have the same names (attribute and model), TODO: missing shorten
                dates: [currentDate],
                shortened: new_url
            })
            new_url_obj.save().then(snap => {
                console.log("Shorten")
                res.json({shortened: new_url})
            }).catch(err => console.log(err))
        }
    })
})



function checkIfExists(shortened){
    var urls = Url.find()
    urls.then(snap => {
        var length = snap.length
        for(let i = 0; i < length; i++){
            if(snap[i].shortend == shortened){
                return true 
            }
        }
        return false
    }).catch(err => console.log(err))
}


//generates a different shortened string of characters pivoting from the urls stored in the DB
 function generate(length){
    let letters = (length) => {
        var string_of_letters = ""
        for(var i = 0; i <= length; i++){
            string_of_letters += String.fromCharCode(parseInt(Math.floor(Math.random() * (121 - 100)) + 100)) //taking ascii and converting it to letters for the link
            console.log(string_of_letters)
        }
        return string_of_letters
    }
    var new_letters = letters(length)
    let checker = checkIfExists(new_letters)
    while(checker){ // while exists 
        new_letters = letters(length)
        checker = checkIfExists(new_letters).then(snap => {
            return snap
        }).catch(err => console.log(err))
    }
    return new_letters
}





module.exports = app