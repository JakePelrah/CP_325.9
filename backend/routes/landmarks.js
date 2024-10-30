import express from "express";
import { getLandmarksByUser, getLandmarks, insertLandmark, deleteLandmark, patchLandmark } from "../db/index.js";
import multer from 'multer';
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Create a new router
export const landmarkRouter = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
   // Upload images to this directory
   destination: function (req, file, cb) {
      cb(null, 'backend/images/landmarks')
   },
   // Rename file
   filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname).name; // Get the original file name without extension
      const extension = path.extname(file.originalname); // Get the file extension

      // Combine original name, unique suffix, and extension
      const newFileName = `${originalName}-${uuidv4()}${extension}`;
      cb(null, newFileName); // Use the new filename
   },
})

// Set Multer storage
const upload = multer({ storage: storage })

// Get landmarks sorted by category
landmarkRouter.get('/getLandmarksByCategory', (req, res) => {
   let landmarks = {
      'artist': [],
      'genre':[],
      'studio': [],
      'venue': [],
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

// Get landmarks by user Google id
landmarkRouter.get('/getLandmarksByUser', (req, res) => {
   try {
      getLandmarksByUser(req.user.id).then(landmarks => res.json(landmarks))
   }
   catch (e) {
      res.json({})
   }
})

// Create a new landmark
landmarkRouter.post('/createLandmark', upload.single('file'), (req, res) => {

   const { filename } = req.file
   let { landmarkState, urlState } = req.body
   const { defaultURL, youTubeURL, wikiURL } = JSON.parse(urlState)
   const { title, description, address,
      category, tilt, range, heading, center, markerPosition,
       markerAltitude } = JSON.parse(landmarkState)


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
            "altitude": markerAltitude
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

   try {
      insertLandmark(newObj)
      res.json({ inserted: true })
   }
   catch (e) {
      res.json({ inserted: false, message: e })
   }
})

// Patch a landmark
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

// Delete a landmark
landmarkRouter.delete('/deleteLandmark', (req, res) => {
   try {
      deleteLandmark(req.body.id)
      res.json({ deleted: true })
   }
   catch (e) {
      res.json({ deleted: false, message: e })
   }
})