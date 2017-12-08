const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = express.Router()

// GET - Read all wishlist products
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
  // Once it has loaded these documents
  // Append product details to product id
  .populate('products')
  .then(wishlist => {
    // Send them back as the response
    if(wishlist) {
      res.json({ products: wishlist.products })
    }
    else {
      // No wishlist created for this user yet, so just return an empty wishlist
      res.json({ products: [] })
    }
  })
  .catch(error => {
    res.status(500).json({ error })
  })
})

// GET - Read an individual wishlist document
// router.get('/wishlist/:id', (req, res) => {
//   const id = req.params.id
//   // Ask the model for the document with this id
//   Wishlist.findById(id)
//     // Once it has loaded this document
//     .then(wishlist => {
//       // If an wishlist was found
//       if(wishlist) {
//         res.json(wishlist)
//       }
//       // If no wishlist was foound
//       else {
//         res.status(404).json({ error: `Wishlist not found with id: ${id}` })
//       }
//     })
//     .catch(error => {
//       // If there was an error, most likely with the format of the id
//       res.status(400).json({ error: error.message })
//     })
// })

// POST - Add product to wishlist
router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  // const attributes = req.body
  Wishlist.findOneAndUpdate(
    { user: req.user },
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
    .then(wishlist => {
      res.status(201).json({ products: wishlist.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})


// // PATCH - Update a wishlist document
// router.patch('/wishlist/:id', (req, res) => {
//   const id = req.params.id
//   const attributes = req.body
//   Wishlist.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
//     .then(wishlist => {
//       // If an wishlist was found and updated
//       if(wishlist) {
//         res.status(200).json(wishlist)
//       }
//       // If no wishlist was found
//       else {
//         res.status(404).json({ error: `Wishlist not found with id: ${id}` })
//       }
//     })
//     .catch(error => {
//       res.status(400).json({ error: error })
//     })
// })

// DELETE - Remove product from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  // const attributes = req.body
  // Not using findOneAndRemove since we are updating
  // the array instead of deleting the whole thing
  Wishlist.findOneAndUpdate(
    { user: req.user },
    // The $pull operator removes from an existing array all instances
    // of a value or values that match a specified condition.
    { $pull: { products: productID } }, // products need to be plural
    // Options when updating
    // upsert: updates if exists, otherwise insert (creates) it
    // new: false gives us the wishlist before it was deleted
    // new: true gives us the updated wishlist
    { upsert: true, new: true, runValidators: true })
    // Append product details to product id
    .populate('products')
    .then(wishlist => {
      res.status(200).json({ products: wishlist.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

module.exports = router