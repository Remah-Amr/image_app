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

exports.uploadVideo = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "video"})
    })
}

exports.uploadVideoLarge = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "video",chunk_size: 5000000})
    })
}

exports.destroyVideo = (id) => {
    return new Promise(resolve => {
        cloudinary.uploader.destroy(id, (result) =>{
        resolve(result)
        }, {resource_type: "video"})
        })
}

// https://cloudinary.com/documentation/image_upload_api_reference#upload_method
// https://cloudinary.com/documentation/upload_videos