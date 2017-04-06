const router = require('express').Router();
const oauth = require("oauth").OAuth2;
const jwt = require('jsonwebtoken');
const Request = require('superagent');
var cookieParser = require('cookie-parser');
const Client_ID = "a9273ead2b00473a7e34";
const Client_Secret = "b5f952a92824ca065a2f08cf3f9443eaa35a1b81";
const OAuth2 = new oauth(Client_ID, Client_Secret, "https://github.com/", "login/oauth/authorize", "login/oauth/access_token");
const secretCode = "E7r9t8@Q#h%Hy+M";

router.use(cookieParser());
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/authentication', function(req, response, next) {
    console.log('inside authentication');
    var code = req.query.code;

    OAuth2.getOAuthAccessToken(code,{}, (err, access_token) => {
        if (err)
            console.log(err);
        else {
            Request.get('https://api.github.com/user?access_token=' + access_token).set('Accept', 'application/json').end(function(err, res) {
                if (err || !res.ok) {
                    console.log(err);
                    response.send('Error in authentication.');
                } else {

                        var userName = res.body.login;
                        var encoded_accestoken = jwt.sign(access_token, secretCode);
                        console.log("access_token "+access_token);
                        console.log("access_token "+encoded_accestoken);

                        response.cookie("access_token", encoded_accestoken);
                        response.cookie("user", userName);
                        response.redirect("http://localhost:6007/#/home");


                }
            });

       }
    })
});



module.exports = router;
