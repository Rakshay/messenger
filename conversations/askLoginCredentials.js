import askPassword from './askPassword';
import askUserName from './askUserName';

/**
 * Fetches user login credentials (userName and password)
 * @name askLoginCredentials
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise((resolve, reject) => {
    askUserName(convo)
      .then((convo) => {
        askPassword(convo)
          .then((convo) => {
            resolve(convo);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });
}