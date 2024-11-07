const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

// Writing my controller here

// C.R.U.D
// Create /-/ Update Delete

router.post(`/`, async (req, res) => {
  try {
    // Creating a new pet
    const createPet = await Pet.create(req.body);
    res.status(201).json(createPet);
  } catch (error) {
    // Setting the error handler
    res.status(500).json({ error: error.message });
  }
});

router.get(`/`, async (req, res) => {
  try {
    const findPets = await Pet.find({});
    res.json(findPets);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get(`/:petId`, async (req, res) => {
  //   Whenever creating a new route. Try testing if it works by:
  // res.json({message: `Show route ${req.params.petId}`})
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error(`Pet not found.`);
    }
    res.status(201).json(foundPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete(`/:petId`, async (req, res) => {
  try {
    const adoptPet = await Pet.findByIdAndDelete(req.params.petId);
    if (!adoptPet) {
      res.status(404);
      throw new Error(`Pet not found`);
    }
    res.status(201).json(adoptPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.put(`/:petId`, async (req, res) => {
  try {
    const updatePet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    });
    if (!updatePet) {
      res.status(404);
      throw new Error(`Pet not found`);
    }
    res.status(201).json(updatePet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Exporting this router at the bottom
module.exports = router;
