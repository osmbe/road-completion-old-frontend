var osmAuth = require('osm-auth');

var CONSUMER_KEY = 'Gfkg2TsByukqTU390SFTaSowO2amYyKkKG2YCF2y';
var CONSUMER_SECRET = 'aFK35sSZLZa3zCeaHXg2riaPd21s2olC3jVjDAXj';

var auth = osmAuth({
    oauth_consumer_key: CONSUMER_KEY,
    oauth_secret: CONSUMER_SECRET,
    auto: true
});

