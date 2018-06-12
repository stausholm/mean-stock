"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const config = require('../config/database');
const User = require('../models/user');

describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect(config.database);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to database!');
      done();
    });
  });
  describe('User Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New User saved to users colection', function(done) {
      var testUser = User({
        name: 'Mike',
        email: 'mike@mike.dk',
        username: 'mikii',
        password: '123test'
      });
 
      testUser.save(done);
    });
    it('Dont save incorrect User format to collection', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = User({
        notName: 'Not Mike'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve Mike User from Users collection', function(done) {
      //Look up the 'Mike' object previously saved.
      User.find({name: 'Mike'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
    it('Should delete Mike from Users collection', function(done) {
        //Look up the 'Mike' object previously saved.
        User.deleteOne({name: 'Mike'}, (err, name) => {
          if(err) {throw err;}
          if(name.length === 0) {console.log('user was deleted')}
          done();
        });
      });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
      mongoose.connection.close(done);
    // mongoose.connection.db.dropDatabase(function(){
    // });
  });
});