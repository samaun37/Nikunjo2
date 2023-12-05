const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Import multer
const path = require('path');

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
    cb(null, 'images/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "images/"))); // Serve uploaded files

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
  imageUrls: [String] // Assuming you store image file paths as strings in MongoDB
});

app.post('/addToLets', async (req, res) => {
  const { country, city, location, room, washroom, rent, imageUrls } = req.body;

  try {
    const newTolet = new toletModel({ country, city, location, room, washroom, rent, imageUrls });
    await newTolet.save();
    console.log('To-Let added successfully');
    res.status(200).json({ message: 'To-Let added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving to database' });
  }
});

// app.post('/addToLets', upload.array('images', 10), async (req, res) => {
//   const { country, city, location, room, washroom, rent, imageUrls } = req.body;
//  // const images = req.files.map(file => file.path); // Get the file paths

//   try {
//     const newTolet = new toletModel({ country, city, location, room, washroom, rent, imageUrls });
//     await newTolet.save();
//     console.log('To-Let added successfully');
//     res.status(200).json({ message: 'To-Let added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving to database' });
//   }
// });

app.get('/getAllToLets', async (req, res) => {
  const allData = await toletModel.find()
  res.json(allData)
});


/*
nov 10, last
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
const fs = require("fs");
app.use(cors());
const multer = require('multer');
const path = require('path');

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

app.listen(3001, () => {
  console.log(`Server is running`);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
//const upload = multer({ storage: storage });
const upload = multer({ storage: storage }).single('image');
app.use(express.static(path.join(__dirname, 'uploads')));

const toletModel = mongoose.model('Data', {
  country: String,
  city: String,
  location: String,
  room: String,
  washroom: String, // Corrected property name
  rent: String,
  img: {
    imageArray: Buffer,
    contentType: String,
  },
});

app.post('/addToLets', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    const { country, city, location, room, washroom, rent } = req.body;

    try {
      const newTolet = new toletModel({ 
        country,
        city,
        location,
        room,
        washroom,
        rent,
        img: {
          imageArray: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png/jpg",
        },
      });

      await newTolet.save();
      console.log('To-Let added successfully');
      res.status(200).json({ message: 'To-Let added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving to the database' });
    }
  });
});


app.get('/getAllToLets', async (req, res) => {
  const allData = await toletModel.find()
  res.json(allData)
});

*/

/*
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const path = require('path');

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

app.listen(3001, () => {
  console.log(`Server is running`);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imageFromFrontEnd/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'imageFromFrontEnd')));

const toletModel = mongoose.model('Data', {
  country: String,
  city: String,
  location: String,
  room: String,
  washroom: String, // Corrected property name
  rent: String,
  images: [String]
});

app.post('/addToLets', upload.array('images', 10), async (req, res) => {
  const { country, city, location, room, washroom, rent } = req.body;
  const images = req.files.map(file => file.path); // Get the file paths

  try {
    const newTolet = new toletModel({ country, city, location, room, washroom, rent, images });
    await newTolet.save();
    console.log('To-Let added successfully');
    res.status(200).json({ message: 'To-Let added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving to database' });
  }
});

app.get('/getAllToLets', async (req, res) => {
  try {
    // Use the select method to specify the fields you want to retrieve
    const toLets = await toletModel.find({}, 'country city location images').exec();

    if (toLets.length > 0) {
      res.status(200).json(toLets);
    } else {
      res.status(404).json({ message: 'No To-Lets found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving To-Lets'});
  }
});

*/
