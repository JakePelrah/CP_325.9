import { query } from 'express'
import * as db from '../db/index.js'


// Find or create user with Google profile information
export async function findOrCreateUser(profile) {

    try {
        const res = query('SELECT * FROM users WHERE id =$1 ', [profile.id])
        console.log(res)
    }
    catch (e) {
        console.log(e)
    }
}