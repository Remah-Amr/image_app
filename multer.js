const multer = require('multer')

// stores file on disk
const fileStorage = multer.diskStorage({
    destination: 'images',
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null,true)
    } else{
        cb(null,false)
    }
}

const videoStorage = multer.diskStorage({
    destination: 'videos',
    filename : (req,file,cb) => {
        cb(null,file.originalname)
    }
})

exports.multerConfigImage = multer({storage: fileStorage,fileFilter:fileFilter}).any()

exports.multerConfigVideo = multer({storage: videoStorage}).any()