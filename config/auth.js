// module.exports = {

//     'facebookAuth' : {
//         'clientID'      : process.env.FACEBOOK_CLIENT_ID, // App ID
//         'clientSecret'  : process.env.FACEBOOK_CLIENT_SECRET, // App Secret
//         'callbackURL'   : process.env.HOST_URL + 'auth/facebook/callback'
//     },

//     'googleAuth' : {
//         'clientID'      : process.env.GOOGLE_CLIENT_ID,
//         'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET,
//         'callbackURL'   : process.env.HOST_URL + 'auth/google/callback'
//     }

// };

module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_CLIENT_ID, // App ID
        'clientSecret'  : process.env.FACEBOOK_CLIENT_SECRET, // App Secret
        'callbackURL'   : process.env.HOST_URL + 'auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_CLIENT_ID,
        'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET,
        'callbackURL'   : process.env.HOST_URL + 'auth/google/callback'
    }

};