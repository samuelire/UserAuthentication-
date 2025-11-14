// CHANGE: Use ES Modules instead of CommonJS
import express from "express";
import bcrypt from "bcrypt";
// CHANGE: Import collection from config.js (ES Module)
import collection from "./config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Views & static files
app.set("view engine", "ejs");
// CHANGE: No need to require path as it wasn’t used
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.render("login"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));

// Signup
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  };

  // CHANGE: Use collection.findOne() correctly
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    // CHANGE: return to stop further execution
    return res.send("User already exists. Please choose another username");
  }

  // CHANGE: Hash password with bcrypt
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRound);
  data.password = hashedPassword;

  // CHANGE: Insert user and log it
  const userdata = await collection.insertMany(data);
  console.log(userdata);

  // CHANGE: Redirect to login after signup
  res.redirect("/login");
});

// Login
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) return res.send("Username cannot be found");

    // CHANGE: Compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      res.render("home");
    } else {
      // CHANGE: Fixed typo req.send → res.send
      res.send("Wrong password");
    }
  } catch (err) {
    console.log(err);
    res.send("Wrong details");
  }
});

// CHANGE: Use dynamic port for Railway
const PORT = process.env.PORT || 2400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
