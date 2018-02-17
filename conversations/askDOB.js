import moment from 'moment';

const fetchUserDOB = function (convo) {
  return new Promise((resolve, reject) => {
    convo.ask(`What's your DOB ? (YYYY-MM-DD)`, (payload, convo) => {
      const text = payload.message.text;
      if (moment(text).isValid()) {
        convo.set('dob', text);
        resolve(convo);
      } else {
        convo.say('That was an invalid date');
        fetchUserDOB(convo, payload)
          .then((convo) => {
            resolve(convo);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};

/**
 * Fetches user DOB
 * @name askDOB
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise ((resolve, reject) => {
    try {
      fetchUserDOB(convo)
        .then((convo) => {
          resolve(convo);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};