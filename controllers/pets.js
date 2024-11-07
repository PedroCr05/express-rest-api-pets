const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

// Writing my controller here

// C.R.U.D
// Create /-/ Update Delete

router.post(`/`, (req, res) => {
  res.json({ message: `Create Route` });
});

// Exporting this router at the bottom
module.exports = router;
