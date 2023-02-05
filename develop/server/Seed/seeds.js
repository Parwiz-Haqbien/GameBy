const db = require('../config/connection');
const { User } = require('../models');
const { Product } = require('../models');
const userSeed = require('./Profile.json');
const productSeed = require('./Product.json');

db.once('open', async () => {
    try {
        await Product.deleteMany({});
        await Product.create(productSeed)

        await User.deleteMany({});
        await User.create(userSeed)

        console.log('data seeded!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});