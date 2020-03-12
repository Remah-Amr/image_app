const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name : 'dqfrk92mp',
    api_key : '253596391863857',
    api_secret: 'zUSdqm663H7lfMKqdirIGZxu318'
})

exports.uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
}