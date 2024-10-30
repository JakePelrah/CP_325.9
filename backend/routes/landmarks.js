import express from "express";
import { getLandmarksByUser, getLandmarks, insertLandmark, deleteLandmark, patchLandmark } from "../db/index.js";
import multer from 'multer';
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const landmarkRouter = express.Router();



const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'backend/images/landmarks')
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
      'song': [],
      'genre':[]
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

landmarkRouter.get('/getLandmarksByUser', (req, res) => {
   try {
      getLandmarksByUser(req.user.id).then(landmarks => res.json(landmarks))
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

      // console.log(markerPosition)

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
      "image_url": `/images/landmarks/${filename}`,
      "user_id":req.user.id
   }
   console.log(newObj)

   try {
      insertLandmark(newObj)
      res.json({ inserted: true })
   }
   catch (e) {
      res.json({ inserted: false, message: e })
   }
})


landmarkRouter.patch('/patchLandmark', (req, res) => {
   try {
      const {id, updatedLandmark} = req.body
      patchLandmark(id, updatedLandmark)
      res.json({ patched: true })
   }
   catch (e) {
      res.json({ patched: false, message: e })
   }
})

landmarkRouter.delete('/deleteLandmark', (req, res) => {
   try {
      deleteLandmark(req.body.id)
      res.json({ deleted: true })
   }
   catch (e) {
      res.json({ deleted: false, message: e })
   }
})