/**
 * Authentication Router for Google OAuth 2.0
 * 
 * This router handles user authentication using Google OAuth 2.0. It uses Passport.js
 * to facilitate the authentication process, allowing users to sign in with their Google 
 * accounts. The router includes routes for logging in, handling redirection after 
 * authentication, logging out, and checking login status.
 */

import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { findOrCreateUser } from "../../db/index.js";

// Configure the Google strategy for use by Passport.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"], // Google Client ID from environment variables
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"], // Google Client Secret from environment variables
      callbackURL: "/oauth2/redirect/google", // URL to redirect after Google authentication
      scope: ["profile"], // Scopes for access
      state: true, // Enable state parameter for security
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // Store the refresh token in the user's profile
        profile._json.refreshToken = refreshToken;
        const user = await findOrCreateUser(profile); // Find or create user in the database

        // Store access token for later use with Google APIs
        user.accessToken = accessToken;

        // If no user found, return false
        if (!user) {
          return cb(null, false);
        }

        // User exists, pass the user object to the callback
        return cb(null, user);
      } catch (e) {
        // Handle error during user retrieval or creation
        return cb(e, "It broke...");
      }
    }
  )
);

// Configure Passport to serialize user information into the session
passport.serializeUser(function (profile, cb) {
  process.nextTick(function () {
    cb(null, profile); // Serialize the entire profile
  });
});

// Configure Passport to deserialize user information from the session
passport.deserializeUser(function (profile, cb) {
  process.nextTick(function () {
    return cb(null, profile); // Deserialize the profile
  });
});

// Create an Express router for authentication
export const authRouter = express.Router();

/* GET /login/federated/google
 *
 * This route redirects the user to Google for authentication.
 * It initiates an OAuth 2.0 flow by redirecting the user to Google's identity server.
 */
authRouter.get(
  "/login/federated/google",
  passport.authenticate("google", {
    accessType: "offline", // Request offline access
    prompt: "consent", // Force consent screen
  })
);

/* GET /oauth2/redirect/google
 *
 * This route completes the authentication process after Google redirects the user back.
 * It handles the user sign-in and account linking.
 */
authRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/map", // Redirect to profile on success
    failureRedirect: "/", // Redirect to failure page on error
  })
);

/* POST /logout
 *
 * This route logs the user out of the application.
 */
authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err); // Handle logout error
    }
    res.json({redirect:true}); // Redirect to home after logout
  });
});

/* GET /isLoggedIn
 *
 * This route checks if the user is logged in and returns user info if authenticated.
 */
authRouter.get('/isLoggedIn', (req, res) => {
  req.user ? res.send(req.user) : res.send({}); // Send user info or empty object
});