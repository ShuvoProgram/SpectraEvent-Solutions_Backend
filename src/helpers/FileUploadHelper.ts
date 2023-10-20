import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';
import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../types/file';

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'upload')
    } ,
    filename : (req , file , cb) => {
        const prefix = Date.now() + file.originalname 
        cb(null , prefix)
    }
})

const fileFilter = (req: any , file: { mimetype: string; } , cb: (arg0: null, arg1: boolean) => void) => {
    const allowedMimetypes = ["image/png" , "image/jpg" , "image/jpeg"]
    if(allowedMimetypes.includes(file.mimetype)){
     cb(null , true)
    }
    else{
     cb(null , true)
    }
 }
 
 
 const limits = {
     fileSize : 10*1024*1024
 }

 const upload = multer({storage , fileFilter , limits})

const uploadToCloudinary = async (file: IUploadFile): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                fs.unlinkSync(file.path);
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};

export const FileUploadHelper = {
    uploadToCloudinary,
    upload
}