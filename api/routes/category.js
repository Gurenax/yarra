const express = require('express')
const Category = require('../models/Category')
const { requireJWT } = require('../middleware/auth')

const router = express.Router()

// GET - Read all categories
router.get('/categories', requireJWT, (req, res) => {
  Category.find()
  // Once it has loaded these documents
  .populate('products')
  .then(categories => {
    // Send them back as the response
    res.json(categories)
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// GET - Read an individual category document
router.get('/categories/:id', requireJWT, (req, res) => {
  const id = req.params.id
  // Ask the model for the document with this id
  Category.findById(id)
    // Once it has loaded this document
    .then(category => {
      // If an category was found
      if(category) {
        res.json(category)
      }
      // If no category was foound
      else {
        res.status(404).json({ error: `Product Category not found with id: ${id}` })
      }
    })
    .catch(error => {
      // If there was an error, most likely with the format of the id
      res.status(400).json({ error: error.message })
    })
})

// POST - Create a new category document
router.post('/categories', requireJWT, (req, res) => {
  const attributes = req.body
  Category.create(attributes)
    .then(category => {
      res.status(201).json(category)
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// PUT - Add new product to category
router.put('/categories/:id/new_product/:productID', requireJWT, (req, res) => {
  const { id, productID } = req.params
  Category.findOneAndUpdate(
    { _id: id },
    // The $addToSet operator adds a value to an array unless
    // the value is already present, in which case $addToSet
    // does nothing to that array.
    { $addToSet: { products: productID } }, // products need to be plural
    // Options when updating
    // upsert: updates if exists, otherwise insert (creates) it
    // new: true gives us the updated wishlist
    { upsert: true, new: true, runValidators: true })
    // Append product details to product id
    .populate('products')
    .then(category => {
      res.status(201).json({ products: category.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// DELETE - Remove product from category
router.delete('/categories/:id/remove_product/:productID', requireJWT, (req, res) => {
  const { id, productID } = req.params
  // const attributes = req.body
  Category.findOneAndUpdate(
    { _id: id },
    // The $addToSet operator adds a value to an array unless
    // the value is already present, in which case $addToSet
    // does nothing to that array.
    { $pull: { products: productID } }, // products need to be plural
    // Options when updating
    // upsert: updates if exists, otherwise insert (creates) it
    // new: true gives us the updated wishlist
    { upsert: true, new: true, runValidators: true })
    // Append product details to product id
    .populate('products')
    .then(category => {
      res.status(200).json({ products: category.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// PATCH - Update a category document
router.patch('/categories/:id', requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Category.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
    .then(category => {
      // If an category was found and updated
      if(category) {
        res.status(200).json(category)
      }
      // If no category was found
      else {
        res.status(404).json({ error: `Product Category not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// DELETE - Destroy a category document
router.delete('/categories/:id', requireJWT, (req, res) => {
  const id = req.params.id
  Category.findByIdAndRemove(id)
    .then(category => {
      // If an category was found and deleted
      if(category) {
        res.status(200).json(category)
      }
      // If no category was found
      else {
        res.status(404).json({ error: `Product Category not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

module.exports = router