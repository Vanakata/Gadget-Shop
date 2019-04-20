const PassportLocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const encryption = require("../util/encryption");

module.exports = new PassportLocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
}, (req, email, password, done) => {
    const user = {
        email: email.trim(),
        password: password.trim(),
        username:req.body.username.trim(),
    }
    User.find({ email: email })
        .then(users => {
            if (users.length > 0) {
                return done("User with that e-mail, already exists")
            }
            user.salt = encryption.generateSalt();
            user.password = encryption.generateHashedPassword(user.salt, user.password);
            user.roles = [];
            User.create(user)
                .then(() => {
                    return done(null)
                })
                .catch(() => {
                    return done("Something went wrong. Check forms for errors")
                })
        })
})