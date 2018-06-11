const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Stock schema
const StockSchema = mongoose.Schema({
    stockName: {
        type: String
    },
    stockHistory: [{
        stockValue: {
            type: Number,
            required: true
        },
        stockTimestamp: {
            type: Date,
            default: Date.now
        }
    }]
});


const Stock = module.exports = mongoose.model('Stock', StockSchema);


module.exports.addStock = (newStock, callback) => {
    newStock.save(callback)
}