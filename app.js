const express = require('express')
const mongoose = require('mongoose')
const imageModel = require('./models/Image')
const {multerConfigImage, multerConfigVideo} = require('./multer')
const cloud = require('./cloudinaryConfig')
const fs = require('fs')
require('dotenv').config()

// fire app new express app
const app = express()

mongoose.connect(process.env.DB,{
    useNewUrlParser:true ,useUnifiedTopology: true
}).then(()=>{
    console.log('mongodb connected')
})

// serve images in directory named images 
app.use('/images',express.static('images'))


app.post('/myImages',multerConfigImage , async (req,res)=>{

    const result = await cloud.uploads(req.files[0].path)

    const imageDetails = {
        imageName : req.files[0].originalname ,
        url : result.url
    }
    const image = new imageModel(imageDetails)
    image.save()

    // delete image local
    fs.unlinkSync(req.files[0].path)

    res.json({
        msg : "DONE",
        image: image
    })
})

app.get('/myImages',async (req,res)=>{
    const images = await imageModel.find()
    res.json(images)
})

app.post('/myVideos', multerConfigVideo ,async (req,res) => {
    try {
        const result = await cloud.uploadVideoLarge(req.files[0].path)
        fs.unlinkSync(req.files[0].path)
        res.json({result})

    } catch(err) {
        res.json({
            err
        })
    }
})

app.post('/DelmyVideos',async (req,res) => {
    try {
        const result = await cloud.destroyVideo('zqs8kisg5vhytm8bgts4')
        res.json({result})

    } catch(err) {
        res.json({
            err
        })
    }
})

app.listen(8080,()=>{
    console.log('server started successfully')
})