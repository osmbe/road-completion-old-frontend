var osmStrategy = require('passport-openstreetmap').Strategy;

var osmConsumerKey = 'Gfkg2TsByukqTU390SFTaSowO2amYyKkKG2YCF2y';
var osmConsumerSecret = 'aFK35sSZLZa3zCeaHXg2riaPd21s2olC3jVjDAXj';

module.exports = new osmStrategy({
    consumerKey: osmConsumerKey,
    consumerSecret: osmConsumerSecret,
    callbackURL: "http://localhost:3000/AUTH/openstreetmap/callback"
    },
    (token, tokenSecret, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(() => {
        // Since I don't think we're going to have any user records,
        // we'll just represent the logged-in user for testing purposes only
        return done(null, profile);
      });
    }
  );