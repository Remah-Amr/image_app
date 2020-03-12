const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name : '',
    api_key : '',
    api_secret: ''
})

exports.uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
}
