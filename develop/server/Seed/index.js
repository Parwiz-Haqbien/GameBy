const db = require('../config/connection');
const { User } = require('../models');
const { Product } = require('../models');
const { Category } = require('../models');
const userSeed = require('./Profile.json');
const productSeed = require('./Product.json');
const categorySeed = require('./Category.json');

db.once('open', async () => {
    try {
        await Product.deleteMany({});
        await Product.create(productSeed)

        await User.deleteMany({});
        await User.create(userSeed)

        await Category.deleteMany({});
        await User.create(categorySeed)

        console.log('data seeded!');
        process.exit(0);
    } catch (err) {
        res.status(400).json(err)
    }
})