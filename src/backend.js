const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://samaunNikunjo:50588@cluster0.lajkg.mongodb.net/Nikunjo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "images/")));

app.listen(3001, () => {
  console.log(`Server is running`);
});

const toletModel = mongoose.model('Data', {
  country: String,
  city: String,
  location: String,
  room: String,
  washroom: String,
  rent: String,
  id: String,
  email: String,
  imageUrls: [String] // Assuming you store image file paths as strings in MongoDB
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String
});

const userModel = mongoose.model('User', userSchema);

app.post('/addToLets', async (req, res) => {
  const { country, city, location, room, washroom, rent,id,email, imageUrls } = req.body;

  try {
    const newTolet = new toletModel({ country, city, location, room, washroom, rent,id, email, imageUrls });
    await newTolet.save();
    console.log('To-Let added successfully');
    res.status(200).json({ message: 'To-Let added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving to database' });
  }
});
app.post('/signUp', async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const newUser = new userModel({ username, email, phone, password });
    await newUser.save();
    console.log('signed up successfully');
    res.status(200).json({ message: 'Signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving to database' });
  }
});

app.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    else{
      console.log(user)
      console.log(password)
    }
    if (password === user.password) {
      return res.status(200).json({ message: 'Sign-in successful', user });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing in' });
  }
});



app.get('/getAllToLets', async (req, res) => {
  const allData = await toletModel.find()
  res.json(allData)
});

app.get('/searchHouseRent', async (req, res) => {
  const { country, city, minRent, maxRent, area } = req.query; // Assuming parameters are passed as query parameters

  console.log(req.query);

  try {
    let query = {};

    if (country) {
      query.country = country;
    }
    if (city) {
      query.city = city;
    }
    if (minRent && maxRent) {
      query.rent = { $gte: minRent, $lte: maxRent };
    } else if (minRent) {
      query.rent = { $gte: minRent };
    } else if (maxRent) {
      query.rent = { $lte: maxRent };
    }
    if (area) {
      query.location = area;
    }
    const searchResults = await toletModel.find(query);
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
});

app.get('/getAllPostForThisUser', async (req, res) => {
  const { email} = req.query; // Assuming parameters are passed as query parameters

  console.log(req.query);
  console.log("email is "+email)

  try {
    let query = {};
    if (email) {
      query.email = email.trim();
    }
    const searchResults = await toletModel.find(query);
    console.log(searchResults[0])
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
});

app.get('/getToLetById', async (req, res) => {
  const { toletId} = req.query; // Assuming parameters are passed as query parameters

  console.log(req.query);
  console.log("toletId is  "+toletId)

  try {
    let query = {};
    if (toletId) {
      query.id = toletId.trim();
    }
    const searchResults = await toletModel.find(query);
    console.log(searchResults[0])
    res.json(searchResults[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
});
