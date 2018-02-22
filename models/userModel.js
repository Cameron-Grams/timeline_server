const mongoose = require( 'mongoose' ); 
const bcrypt = require( 'bcrypt' );

const userSchema = mongoose.Schema( {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userTimelines: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'timeline' 
    }]
} );

userSchema.pre( 'save', function ( next ) {  
    var user = this;
    if ( this.isModified( 'password' ) || this.isNew ) {
      bcrypt.genSalt( 10, ( err, salt ) => {
        if ( err ) {
          return next( err );
        }
        bcrypt.hash( user.password, salt, ( err, hash ) => {
          if ( err ) {
            return next( err );
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });

 userSchema.methods.comparePassword = function userComparePassword( password ){
   return  bcrypt.compare( password, this.password );
 }


const user = mongoose.model( 'user', userSchema );

module.exports = { user };

