const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//models
const Url = require("./models/url")
//external js files
const api = require("./api")
//api
app.use("/api", api)

//external html pages
const indexHTML = fs.readFileSync("./public/index.html", "utf8")

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => {
    res.send(indexHTML)
})

app.get("/short/:shortened", (req, res) => {
    const {shortened} = req.params
    console.log(shortened)
    Url.findOne({shortened: shortened}).then(snap => {
        if(snap){
            res.redirect(snap.url)
        }
        res.send("nothing")
    }).catch(err => console.log(err))
})



app.listen(3000, () => console.log("listening on port 3000"))