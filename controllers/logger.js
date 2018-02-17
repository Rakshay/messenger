'use strict';

import Log from '../models/log';

/**
 * Adds a new ToDo item
 *
 * @export
 * @param {Object} chat - facebook chat object
 * @returns {Promise} Promise object that indicates if the ToDo item is added
 */
export function addLog (chat) {
  return new Promise((resolve, reject) => {
    Log.create(chat)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}