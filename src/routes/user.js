import express from "express";
import { getLandmarksByUserId } from "../../db/index.js";

// Create an Express router for authentication
export const userRouter = express.Router();


userRouter.get('/getLandmarksByUserId/:id', (req, res) => {

    try {
        getLandmarksByUserId(req.params.id).then(landmarks => {
            res.json(landmarks)
        })
    }
    catch (e) {
        res.json([])
    }
})