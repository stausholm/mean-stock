"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const config = require('../config/database');
const User = require('../models/user');

describe('User collection mongoDB', function() {
  before(function (done) {
    mongoose.connect(config.database);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to db');
      done();
    });
  });
  describe('User Database', function() {
    //Save Bob user
    it('New User saved to users colection', function(done) {
      var testUser = User({
        email: 'bob@bob.dk',
        password: '123test'
      });
 
      testUser.save(done);
    });
    it('Prevent saving data to collection if model schema does not match', function(done) {
      // Return err when attempting to save incorrect data
      var wrongSave = User({
        notName: 'Not Bob'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve Bob User from Users collection', function(done) {
      //Look up Bob in the Users collection.
      User.find({email: 'bob@bob.dk'}, (err, email) => {
        if(err) {throw err;}
        if(email.length === 0) {throw new Error('could not find Bob');}
        done();
      });
    });
    it('Should delete Bob from Users collection', function(done) {
        //Look up Bob and delete him again.
        User.deleteOne({email: 'bob@bob.dk'}, (err, email) => {
          if(err) {throw err;}
          if(email.length === 0) {console.log('Bob was deleted')}
          done();
        });
      });
  });
  // close connection to db after tests are done
  after(function(done){
      mongoose.connection.close(done);
  });
});