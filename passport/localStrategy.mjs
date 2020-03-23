import User from '../models/user';
import LocalStrategy from 'passport-local';

const strategy = new LocalStrategy({
    usernameField: 'username' // not necessary, DEFAULT
  },
  function (username, password, done) {
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username'
        })
      }
      if (!user.checkPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }
      return done(null, user)
    })
  }
)

export default strategy;