import express from "express";
import { getLandmarks } from "../db/index.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

export const landmarkRouter = express.Router();


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


landmarkRouter.post('/createLandmark',upload.single('file'), (req, res)=>{
   console.log(req.body); // Logs all the form fields
   console.log(req.file); // Logs the file information
 
   // You can now access all the fields:
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
   } = req.body;
})