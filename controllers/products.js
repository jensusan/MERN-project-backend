const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productSeed = require('../models/productSeed')

//seed
router.get('/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/');
	});
});

router.get("/", (req, res) => {
    res.send("hello world")
});

router.get("/products", async (req, res) => {
    try {
        res.json(await Product.find({}))
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/products", async (req, res) => {
    try {
        res.json(await Product.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put("/products/:id", async (req, res) => {
    try {
        res.json(await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    } catch (error) {
        res.status(400).json(error);
    }
})
module.exports = router;
