const cloudinary = require('cloudinary')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto" })
    })
}

exports.uploadVideo = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "video" })
    })
}

exports.uploadVideoLarge = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "video", chunk_size: 5000000 })
    })
}

exports.destroyVideo = (id) => {
    return new Promise(resolve => {
        cloudinary.uploader.destroy(id, (result) => {
            resolve(result)
        }, { resource_type: "video" })
    })
}

// https://cloudinary.com/documentation/image_upload_api_reference#upload_method
// https://cloudinary.com/documentation/upload_videos