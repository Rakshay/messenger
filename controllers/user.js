'use strict';

import User from '../models/user';

/**
 * Updates the user information
 *
 * @export
 * @param {object} userInfo The user profile object
 * @returns {Promise} Promise object that adds a user
 */
export function addUser (userInfo) {
  return new Promise((resolve, reject) => {
    User.create({
      userName: userInfo.first_name + userInfo.last_name,
      password: 'password',
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      id: userInfo.id
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Updates the user information
 *
 * @export
 * @param {string} userName The userName of the user
 * @param {object} updatedUserInfo The user profile object
 * @returns {Promise} Promise object that updates a user
 */
export function updateUser (userName, updatedUserInfo) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      userName
    }, {
      $set: updatedUserInfo
    }, {
      new: true
    }, function (err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

/**
 * Updates the user provided a facebook id
 *
 * @export
 * @param {string} facebookId The user's facebook id
 * @param {object} updatedUserInfo The user profile object
 * @returns {Promise} Promise object that updates a user
 */
export function updateUserById (facebookId, updatedUserInfo) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      facebookId
    }, {
      $set: updatedUserInfo
    }, {
      new: true
    }, function (err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

/**
 * Fetches the user by facebook id
 *
 * @export
 * @param {string} facebookId
 * @returns {Promise} Promise object that fetches the user
 */
export function fetchUserInfo (facebookId) {
  return new Promise((resolve, reject) => {
    User.findOne({ facebookId }, '-_id -password -__v').exec(function (err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

/**
 * Validates the user's credentials
 *
 * @export
 * @param {string} userName
 * @param {string} password
 * @returns {Promise} Promise object that validates a user
 */
export function authenticateUser (userName, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ userName }).exec(function (err, user) {
      if (err) {
        reject(err);
      } else {
        if (user === null) {
          resolve(false);
        } else {
          user.comparePassword(password)
            .then((isMatch) => {
              resolve(isMatch);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
    });
  });
}
