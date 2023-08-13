import multer from 'multer'
import { __dirname } from '../utils.js'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname == 'profile-picture') {
      cb(null, __dirname + '/uploads/profile')
    } else if (file.fieldname == 'product-images') {
      cb(null, __dirname + '/uploads/products')
    } else {
      cb(null, __dirname + '/uploads/documents')
    }

  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  }
})

const upload = multer({ storage })
export const userUpload = upload.fields([{ name: 'profile-picture', maxCount: 1 }, { name: 'product-images', maxCount: 4 }, { name: 'docs', maxCount: 3 }])