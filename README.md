# Music Landmarks
This project displays music related landmarks using a 3D Map.
Users can explore musica landmarks from around the globe. Logging in with a Gmail account allowd users to create, modify, and delete landmarks.

## Hosting 
The [application](https://psfinal-5d163b773e42.herokuapp.com/) is being hosted on Heroku. 

**Github**: [CP_325.9](https://github.com/JakePelrah/CP_325.9)

## Frontend
 The frontend uses React, React Router, and contenxt provider to deliver views and data.
    Maps and places are provided by the Google Maps API.

- [React Components](src/components/)
- [Providers](src/providers/)
- [Client Routing](src/main.jsx)
- [Private Route](src/components/PrivateRoute.jsx)

## Backend

The backend is using an Express server. Authentication and authorization are handled using the Google Oauth strategy for PassportJS. CRUD operations are handled using MongoDB. Image uploads are processed using Multer.

- [Express Server](../server.js)
- [Passport OAuth](./routes/auth.js) 
- [MongoDB](./db/index.js)
- [CRUD Routes](./routes/landmarks.js)
- [Uploads](./images/landmarks)


## Requirements
- [X] Project is organized into appropriate files and directories, following best practices. 
- [X] Project contains an appropriate level of comments. 
- [X] Project is pushed to GitHub, and contains a README file that documents the
project, including an overall description of the project. 
- [X] Standard naming conventions are used throughout the project. 
- [X] Ensure that the program runs without errors (comment out things that do not work,
and explain your blockers - you can still receive partial credit). 
- [X] Level of effort displayed in creativity, presentation, and user experience. 
- [X] Demonstrate proper usage of ES6 syntax and tools. 
- [X] Use functions and classes to adhere to the DRY principle. 
- [X] Use Promises and async/await, where appropriate. 
- [X] Use fetch to retrieve data from an API. 
- [X] Use sound programming logic throughout the application. 
- [X] Use appropriate exception handling.
- [X] Use React to create the application’s front-end. 
- [X] Use CSS to style the application. 
- [X] Create at least four different views or pages for the application. 
- [X] Create some form of navigation that is included across the application’s pages,
utilizing React Router for page rendering.
- [X] Use React Hooks or Redux for application state management. 
- [X] Interface directly with the server and API that you created. 
- [X] Use MongoDB to create a database for your application. 
- [X] Apply appropriate indexes to your database collections. 
- [X] Create reasonable schemas for your data by following data modeling best practices. 
- [X] Create a RESTful API using Node and Express.
- [X] Include API routes for all four CRUD operations. 
- [X] Utilize the native MongoDB driver to interface with your database.
- [X] Include at least one form of user authentication/authorization within the application.


