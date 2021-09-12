const express = require("express")
const app = express()
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

///////////////////////Connecting to DB/////////////////////////////////

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

//const User = require('./models/User');

//////////////////////////////////////Login///////////////////////////////////

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ error: { errors: [{ msg: info.message }] } }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json({ message: "success" });
        });
    })(req, res, next);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/main/resources/templates/login.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Chat Server is listening at http://localhost:${port}`);
});