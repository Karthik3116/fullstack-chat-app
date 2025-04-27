import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Print the PORT from the environment variables
console.log("PORT from .env:", process.env.PORT);

// Optionally, log all environment variables for debugging
console.log("All environment variables:", process.env);
