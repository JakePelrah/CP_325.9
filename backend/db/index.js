import dotenv from 'dotenv'
import pg from 'pg'
dotenv.config()

const { Pool } = pg
const pool = new Pool()
 
export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}




// ////////////////////////////// INDEX //////////////////////////////////////
// // Index landmarks by user_id
// db.collection('landmarks').createIndex({ user_id: 1 })

// ////////////////////////////// CREATE //////////////////////////////////////

// // Find or create user with Google profile information
// export async function findOrCreateUser(profile) {

//   // Get users collection
//   const userCollection = db.collection('users')

//   // Find user in collection
//   let user = await userCollection.findOne({ id: profile.id })

//   // If user does not exist
//   if (!user) {

//     // Create user
//     user = userCollection.insertOne(profile)
//     console.log('Creating new user.')
//   }
//   return user
// }

// // Insert a new landmark into collection
// export async function insertLandmark(newLandmark) {
//   const landmarkCollection = db.collection('landmarks')
//   landmarkCollection.insertOne(newLandmark)
// }

// ////////////////////////////////////// READ //////////////////////////////////////

// // Get landmarks by users Google id
// export async function getLandmarksByUser(user_id) {
//   const collection = db.collection('landmarks')
//   const results = collection.find({ user_id }).toArray()
//   return results
// }

// // Get all landmarks in collection
// export async function getLandmarks() {
//   const collection = db.collection('landmarks')
//   const results = collection.find({}).toArray()
//   return results
// }

// ////////////////////////////////////// UPDATE //////////////////////////////////////

// // Patch a landmark
// export async function patchLandmark(id, updatedLandmark) {
//   const { title, description, defaultURL, wikiURL, youTubeURL } = updatedLandmark
//   const collection = db.collection('landmarks')
//   const results = collection.updateOne({ _id: new ObjectId(id) }, {
//     $set: {
//       title,
//       description,
//       defaultURL,
//       wikiURL,
//       youTubeURL
//     }
//   })
//   return results
// }

// ////////////////////////////////////// DELETE //////////////////////////////////////

// // Delete a landmark 
// export async function deleteLandmark(id) {
//   const collection = db.collection('landmarks')
//   const results = collection.deleteOne({ _id: new ObjectId(id) })
//   return results
// }


