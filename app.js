const express = require('express')
const mongoose = require('mongoose')
const imageModel = require('./models/Image')
const multerConfig = require('./multer')
const cloud = require('./cloudinaryConfig')
const fs = require('fs')

// fire app new express app
const app = express()

mongoose.connect("mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true ,useUnifiedTopology: true
}).then(()=>{
    console.log('mongodb connected')
})

// serve images in directory named images 
app.use('/images',express.static('images'))


app.post('/myImages',multerConfig , async (req,res)=>{

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

app.listen(8080,()=>{
    console.log('server started successfully')
})