/**
 * Fetches user password
 * @name askPassword
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise ((resolve, reject) => {
    try {
      convo.ask(`What's your Password ?`, (payload, convo) => {
        const text = payload.message.text;
        convo.set('password', text);
        resolve(convo);
      });
    } catch (err) {
      reject(err);
    }
  });
};