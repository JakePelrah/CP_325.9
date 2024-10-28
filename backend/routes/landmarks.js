import express from "express";
import { getLandmarks } from "../db/index.js";

// Create an Express router for authentication
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