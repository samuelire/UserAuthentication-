// CHANGE: Use ES Modules instead of CommonJS
import mongoose from "mongoose";

// CHANGE: Use environment variable for MongoDB URI
// Fallback to local MongoDB for development
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Login-reg";

// CHANGE: Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully")) // CHANGE: improved log
.catch((err) => console.log("Database connection failed", err)); // CHANGE: log error details

// CHANGE: Define schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// CHANGE: Create model
const Users = mongoose.model("Users", LoginSchema);

// CHANGE: Export model using ES Module syntax
export default Users;
