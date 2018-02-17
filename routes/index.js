import * as userController from '../controllers/user';
import * as loggerController from '../controllers/logger';
import conversations from '../conversations';

export default (bot) => {
  bot.on('message', (payload, chat, data) => {
    loggerController.addLog(payload)
      .then(() => {
        console.log('Chat logged');
      })
      .catch((err) => {
        console.error(err);
      });

    userController.fetchUserInfo(payload.sender.id)
      .then((user) => {
        if (user === null) {
          chat.conversation((convo) => {
            conversations.askLoginCredentials(convo)
              .then((convo) => {
                userController.authenticateUser(convo.get('userName'), convo.get('password'))
                  .then((result) => {
                    if (result === true) {
                      convo.say('Succesfully authenticated')
                        .then(() => {
                          convo.say('Please provide additional profile information')
                            .then(() => {
                              conversations.askProfileInfo(convo)
                                .then(() => {
                                  chat.getUserProfile()
                                    .then((user) => {
                                      userController.updateUser(convo.get('userName'), {
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        dob: convo.get('dob'),
                                        email: convo.get('email'),
                                        facebookId: user.id
                                      })
                                        .then((user) => {
                                          convo.say('Succesfully updated User Profile')
                                            .then(() => {
                                              convo.end();
                                              chat.say(`Hi ${user.first_name}`);
                                            })
                                            .catch((err) => {
                                              console.error(err);
                                              convo.end();
                                            });
                                        })
                                        .catch((err) => {
                                          console.error(err);
                                        })
                                    })
                                    .catch((err) => {
                                      console.error(err);
                                      convo.end();
                                    });
                                })
                                .catch((err) => {
                                  console.error(err);
                                  convo.end();
                                })
                            })
                            .catch((err) => {
                              console.error(err);
                              convo.end();
                            });
                        })
                        .catch((err) => {
                          convo.end();
                          console.error(err);
                        })
                    } else {
                      convo.say('Authentication failed');
                      convo.end();
                    }
                  })
                  .catch((err) => {
                    convo.end();
                    console.error(err);
                  });
              })
              .catch((err) => {
                console.error(err);
                convo.end();
              });
          });
        }
      })
      .catch(() => {
        console.error(err);
      })
  });

  bot.hear([/^what(?=.*email).*/g], (payload, chat) => {
    userController.fetchUserInfo(payload.sender.id)
      .then((user) => {
        chat.say(`Your email address is ${user.email}`);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  bot.hear([/^what(?=.*dob).*/g], (payload, chat) => {
    userController.fetchUserInfo(payload.sender.id)
      .then((user) => {
        chat.say(`Your dob is ${user.dob}`);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  bot.hear([/^update(?=.*dob).*/g], (payload, chat) => {
    chat.conversation((convo) => {
      conversations.askDOB(convo)
        .then(() => {
          userController.updateUserById(payload.sender.id, {
            dob: convo.get('dob')
          })
            .then((user) => {
              convo.say('Succesfully updated DOB')
                .then(() => {
                  convo.end();
                })
                .catch((err) => {
                  console.error(err);
                  convo.end();
                });
            })
            .catch((err) => {
              console.error(err);
            })
        })
        .catch((err) => {
          console.error(err)
        });
      });
  });

  bot.hear([/^update(?=.*email).*/g], (payload, chat) => {
    chat.conversation((convo) => {
      conversations.askDOB(convo)
        .then(() => {
          userController.updateUserById(payload.sender.id, {
            email: convo.get('email')
          })
            .then((user) => {
              convo.say('Succesfully updated email')
                .then(() => {
                  convo.end();
                })
                .catch((err) => {
                  console.error(err);
                  convo.end();
                });
            })
            .catch((err) => {
              console.error(err);
            })
        })
        .catch((err) => {
          console.error(err)
        });
      });
  });

  bot.on('message', (payload, chat, data) => {
    if (data.captured === false) {
      chat.say(payload.message.text);
    }
  });
}