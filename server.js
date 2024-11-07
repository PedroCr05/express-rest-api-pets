const dotenv = require(`dotenv`);
dotenv.config();
const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const cors = require(`cors`);

// Import the controller file
const petRouter = require(`./controllers/pets.js`);
app.use(cors({ origin: `http://localhost:5173` }));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on(`connected`, () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Our routes go here
// The variable we're calling is basically our function that adds onto our link string
// Basically if petRouter() was `/cat` the app.use() would look like this | app.use(`/pets/cats`)
// But because petRouter() is just a (`/`) it will only change within (`/pets`)
app.use(`/pets`, petRouter);

app.listen(3000, () => {
  console.log(`The express app is ready!`);
});
