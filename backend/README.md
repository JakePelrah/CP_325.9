# CP 325.9 Backend


**Description** : The backend is using an Express server. Authentication and authorization are handled using the Google Oauth strategy for PassportJS. CRUD operations are handled using MongoDB. Image uploads are processed using Multer.

**Hosting**: The [application](https://psfinal-5d163b773e42.herokuapp.com/) is being hosted on Heroku

Express Server: [server.js](../server.js)

Oauth using Passport: [auth.js](./routes/auth.js) 

MongoDB setup: [index.js](./db/index.js)

CRUD Routes: [landmarks.js](./routes/landmarks.js)

File Uploads: [images](./images/landmarks)


Requirements:

- [X] Use MongoDB to create a database for your application. 
- [X] Apply appropriate indexes to your database collections. 
- [X] Create reasonable schemas for your data by following data modeling best practices. 
- [X] Create a RESTful API using Node and Express.
- [X] Include API routes for all four CRUD operations. 
- [X] Utilize the native MongoDB driver to interface with your database.
- [X] Include at least one form of user authentication/authorization within the application.


