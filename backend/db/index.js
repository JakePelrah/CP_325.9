import dotenv from 'dotenv'
import { MongoClient, ObjectId } from "mongodb";
dotenv.config()

const client = new MongoClient(process.env.MONGO_CONNECTION_URL)

let conn;
try {
  conn = await client.connect()
} catch (e) {
  console.log(e)
}

let db = conn.db('lmd')


////////////////////////////// CREATE //////////////////////////////////////
export async function findOrCreateUser(profile) {

  // get users collection
  const userCollection = db.collection('users')

  // find user
  let user = await userCollection.findOne({ id: profile.id })

  if (!user) {
    // create user
    user = userCollection.insertOne(profile)
    console.log('Creating new user.')
  }
  return user
}

export async function insertLandmark(newLandmark) {
  const landmarkCollection = db.collection('landmarks')
  landmarkCollection.insertOne(newLandmark)
}

////////////////////////////////////// READ //////////////////////////////////////
export async function getLandmarksByUser(user_id) {
  const collection = db.collection('landmarks')
  const results = collection.find({ user_id }).toArray()
  return results
}

export async function getLandmarks() {
  const collection = db.collection('landmarks')
  const results = collection.find({}).toArray()
  return results
}

////////////////////////////////////// UPDATE //////////////////////////////////////
export async function patchLandmark(id, updatedLandmark) {
  const { title, description, defaultURL, wikiURL, youTubeURL } = updatedLandmark
  const collection = db.collection('landmarks')
  const results = collection.updateOne({ _id: new ObjectId(id) }, {
    $set: {
      title,
      description,
      defaultURL,
      wikiURL,
      youTubeURL
    }
  })
  return results
}

////////////////////////////////////// DELETE //////////////////////////////////////
export async function deleteLandmark(id) {
  const collection = db.collection('landmarks')
  const results = collection.deleteOne({ _id: new ObjectId(id) })
  return results
}


