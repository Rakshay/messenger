import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Chat User schema
 * @class User
 * @memberof Models
 */
const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  first_name: String,
  last_name: String,
  dob: String,
  email: String,
  facebookId: String
});

/**
 * Hash the password
 *
 * @method
 * @param {object} next the object that refers to the middleware
 * @listens 'save'
 */
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err);
          }

          user.password = hash;
          next();
        });
      }
    });
  }
});

/**
 * Fetches user login credentials (userName and password)
 * @name comparePassword
 * @function
 * @memberof User
 * @param {object} convo The conversation object
 */
UserSchema.methods.comparePassword = function (password, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

export default mongoose.model('userSchema', UserSchema);