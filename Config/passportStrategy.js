var JwtStrategy = require( 'passport-jwt' ).Strategy;  
var ExtractJwt = require( 'passport-jwt' ).ExtractJwt;  
var { user } = require('../models/userModel');  
var config = require('./config');

const basicStrategy = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.SECRET;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({ _id: jwt_payload._id}, function(err, user) {   
      if (err) {
        console.log('error in the strategy');
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

module.exports = { basicStrategy };