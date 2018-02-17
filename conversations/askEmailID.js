import moment from 'moment';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const fetchUserEmail = function (convo) {
  return new Promise((resolve, reject) => {
    convo.ask(`What's your Email address ?`, (payload, convo) => {
      const text = payload.message.text;
      if (emailRegex.test(text)) {
        convo.set('email', text);
        resolve(convo);
      } else {
        convo.say('That was an invalid email address');
        fetchUserEmail(convo, payload)
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
 * Fetches user email
 * @name askEmailID
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise ((resolve, reject) => {
    try {
      fetchUserEmail(convo)
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