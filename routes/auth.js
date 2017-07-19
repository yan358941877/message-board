var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});
passport.use(new GitHubStrategy({
    clientID: '019d08934481c214d7e4',
    clientSecret: '2c8e31addabef4bbec4e4b9d963c7ac8ad2f23b4',
    callbackURL: "http://www.yanxinxin.cn/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/notes');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user.username)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    
    res.redirect('/notes');
  });

module.exports = router