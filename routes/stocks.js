const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

const Stock = require('../models/stock');

// Add stock
router.post('/add-stock', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newStock = new Stock({
        stockName: req.body.stockName,
        stockHistory: [{
            stockValue: req.body.stockValue
        }]
    });
    
    Stock.addStock(newStock, (err, stock) => {
        if (err) {
            res.json({success: false, msg: 'Failed to add stock'})
        } else {
            res.json({success: true, msg: 'stock added'})
        }
    });
});


// Update stock
router.put('/update-stock/:stockId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Stock.findByIdAndUpdate(req.params.stockId, {
        $push: {
            stockHistory: {
                stockValue: req.body.stockValue
            }
        }
    },{
        upsert: true
    },
    (err, updatedStock) => {
        if (err) {
            res.send('Error updating stock');
        } else {
            return res.json({success: true, message: 'stock updated' });
        }   
    });
});

// Delete a stock
router.delete('/delete-stock/:stockId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Stock.findByIdAndRemove(req.params.stockId,
        (err, removedStock) => {
            if (err) {
                res.send('Error removing stock');
            } else {
                return res.json({success: true, message: 'stock removed' });
            }   
        }
    );
});

// get all stocks
router.get('/stocks', (req, res, next) => {
    Stock.find({},
        (err, allStocks) => {
            if (err) {
                res.send('Error getting stocks');
            } else {
                return res.json(allStocks);
            }   
        }
    );
});

// get single stocks
router.get('/stocks/:stockId', (req, res, next) => {
    Stock.findById(req.params.stockId,
        (err, singleStock) => {
            if (err) {
                res.send('Error getting single stock');
            } else {
                return res.json(singleStock);
            }   
        }
    );
});


router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyClients(client);
};
router.notifyClients = function (client) {
    Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            console.log('socket foreach', router.clients.length)
            socket.emit('update', stocks);
        })
    });
}

module.exports = router;