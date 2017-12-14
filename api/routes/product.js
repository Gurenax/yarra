const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// GET - Read all product
router.get('/products', (req, res) => {
  Product.find()
  // Once it has loaded these documents
  .populate('categories')
  .then(products => {
    // Send them back as the response
    res.json(products)
  })
  .catch(error => {
    res.status(400).json({ error: error.message })
  })
})

// GET - Read an individual product document
router.get('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  // Ask the model for the document with this id
  Product.findById(id)
    // Once it has loaded this document
    .populate('categories')
    .then(product => {
      // If an product was found
      if(product) {
        res.json(product)
      }
      // If no product was foound
      else {
        res.status(404).json({ error: `Product not found with id: ${id}` })
      }
    })
    .catch(error => {
      // If there was an error, most likely with the format of the id
      res.status(400).json({ error: error.message })
    })
})

// POST - Create a new product document
router.post('/products', authMiddleware.requireJWT, (req, res) => {
  const attributes = req.body
  Product.create(attributes)
    .then(product => {
      Product.findOne(product)
      .populate('categories')
      .then(product => {
        res.status(201).json(product)
      })
      .catch(error => {
        res.status(400).json({ error: error })
      })
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// PATCH - Update a product document
router.patch('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Product.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
    .populate('categories')
    .then(product => {
      // If an product was found and updated
      if(product) {
        res.status(200).json(product)
      }
      // If no product was found
      else {
        res.status(404).json({ error: `Product not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// DELETE - Destroy a product document
router.delete('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.findByIdAndRemove(id)
    .then(product => {
      // If an product was found and deleted
      if(product) {
        res.status(200).json(product)
      }
      // If no product was found
      else {
        res.status(404).json({ error: `Product not found with id: ${id}` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

module.exports = router