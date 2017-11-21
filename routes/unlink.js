module.exports = function(app, passport) {
// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            console.log(JSON.stringify(user));
            if (err) {
                console.log(err);
                res.redirect("/auth/profile");
            }
            if (user.facebook.token === undefined && user.google.token === undefined){
                req.logout();
            }
            res.redirect('/auth/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            console.log(JSON.stringify(user));
            if (err) {
                console.log(err);
                res.redirect("/auth/profile");
            }
            if (user.local.password === undefined && user.google.token === undefined){
                req.logout();
            }
            res.redirect('/auth/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            console.log(JSON.stringify(user));
            if (err) {
                console.log(err);
                res.redirect("/auth/profile");
            }
            if (user.facebook.token === undefined && user.local.password === undefined){
                req.logout();
            }
           res.redirect('/auth/profile');
        });
    });
}