import askDOB from './askDOB';
import askEmailID from './askEmailID';

/**
 * Fetches user profile info (DOB and email)
 * @name askProfileInfo
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise((resolve, reject) => {
    askDOB(convo)
      .then((convo) => {
        askEmailID(convo)
          .then((convo) => {
            resolve(convo);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });
}