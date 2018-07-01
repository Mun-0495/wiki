/* global WIKI */

// ------------------------------------
// GitHub Account
// ------------------------------------

const GitHubStrategy = require('passport-github2').Strategy

module.exports = {
  key: 'github',
  title: 'GitHub',
  useForm: false,
  props: {
    clientId: String,
    clientSecret: String
  },
  init (passport, conf) {
    passport.use('github',
      new GitHubStrategy({
        clientID: conf.clientId,
        clientSecret: conf.clientSecret,
        callbackURL: conf.callbackURL,
        scope: ['user:email']
      }, (accessToken, refreshToken, profile, cb) => {
        WIKI.db.users.processProfile(profile).then((user) => {
          return cb(null, user) || true
        }).catch((err) => {
          return cb(err, null) || true
        })
      }
      ))
  }
}
