import express from "express";
import { getLandmarks, insertLandmark } from "../db/index.js";
import multer from 'multer';
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const landmarkRouter = express.Router();



const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/landmarks')
   },
   filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname).name; // Get the original file name without extension
      const extension = path.extname(file.originalname); // Get the file extension

      // Combine original name, unique suffix, and extension
      const newFileName = `${originalName}-${uuidv4()}${extension}`;
      cb(null, newFileName); // Use the new filename
   },
})

const upload = multer({ storage: storage })

landmarkRouter.get('/getLandmarksByCategory', (req, res) => {
   let landmarks = {
      'venue': [],
      'studio': [],
      'artist': [],
      'label': [],
      'song': []

   }
   try {
      getLandmarks().then(data => {
         for (const entry of data) {
            landmarks[entry.category].push(entry)
         }
         res.json(landmarks)
      })
   }
   catch (e) {
      res.json({})
   }
})

landmarkRouter.get('/getLandmarks', (req, res) => {
   try {
      getLandmarks().then(landmarks => res.json(landmarks))
   }
   catch (e) {
      res.json({})
   }
})


landmarkRouter.post('/createLandmark', upload.single('file'), (req, res) => {

   const { filename } = req.file
   let { landmarkState, urlState } = req.body
   const { defaultURL, youTubeURL, wikiURL } = JSON.parse(urlState)
   const { title, description, address,
      category, tilt, range, heading, center, markerPosition } = JSON.parse(landmarkState)


   const newObj = {
      "title": title,
      "description": description,
      "address": address,
      "category": category,
      "camera": {
         "tilt": tilt,
         "range": range,
         "heading": heading
      },
      "coords": {
         "view": {
            "latitude": center.lat,
            "longitude": center.lng,
            "altitude": center.altitude
         },
         "marker": {
            "latitude": markerPosition.lat,
            "longitude": markerPosition.lng,
            "altitude": markerPosition.altitude
         }
      },
      "created": new Date(),
      "websites": {
         "wikipedia": wikiURL,
         "default": defaultURL,
         "youtube": youTubeURL
      },
      "image_url":`/images/landmarks/${filename}`
   }

   try{
      insertLandmark(newObj)
      res.json({inserted:true})
   }
   catch(e){
      res.json({inserted:false, message:e})
   }
})