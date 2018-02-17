/**
 * Fetches user's userName
 * @name askUserName
 * @function
 * @memberof Conversations
 * @param {object} convo The conversation object
 */
export default (convo) => {
  return new Promise ((resolve, reject) => {
    try {
      convo.ask(`What's your UserName?`, (payload, convo) => {
        const text = payload.message.text;
        convo.set('userName', text);
        resolve(convo);
      });
    } catch (err) {
      reject(err);
    }
  });
};