import express from "express";
import { getLandmarks } from "../db/index.js";
import multer from 'multer';
import path from 'path'

export const landmarkRouter = express.Router();



const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images/landmarks')
   },
   filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname).name; // Get the original file name without extension
      const extension = path.extname(file.originalname); // Get the file extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique suffix

      // Combine original name, unique suffix, and extension
      const newFileName = `${originalName}-${uniqueSuffix}${extension}`;
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
   const {
      landMarkTitle,
      landMarkAddress,
      landMarkDescription,
      altitude,
      latitude,
      longitude,
      tilt,
      heading,
      range,
      markerAltitude,
      defaultURL,
      wikiURL,
      youTubeURL
   } = req.body;
   console.log(landMarkTitle)
})