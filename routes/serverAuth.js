var router=require('express').Router();


// router.use(function (req, res, next) {
//     try {

//         const token = req.body.token || req.headers.authorization;

//         console.log("Cookies :  ", req.cookies)
//         console.log(token);
//         // decode token
//         // if (token) {
//         //     this.verifyToken(token).then((successResult) => {
//         //        console.log("token verified");
//         //         req.decoded = successResult.decoded;
//         //         next();
//         //     }, (errResult) => {
//         //         console.log('Internal error occurred');
//         //         return res.status(500).send({ error: 'Internal error occurred, please try later..!', message: 'UnAuthorised User' });
//         //     });
//         // } else {
//         //     // if there is no token
//         //     // return an error
//         //     console.log('Token not provided');
//         //     return res.status(403).send({
//         //         message: 'No token provided.'
//         // });
//         // }
//     } catch (error) {
//         return error;
//     }
// });
var verifyToken=function()
{
 jwt.verify(usertoken, appConstant.secret, function(err, decoded) {
            if (err) {
                logger.error('Token not matched');
                reject(err);
            } else {
                // if everything is good, save to request for use in other routes
                console.log('Token matched');
                resolve({
                    decoded: decoded
                });
            }
        });}



function requireLogin(req, res, next) {
  if (req.decode) {
    next();
  } else {

    res.redirect("#/login");
  }
}

// Automatically apply the `requireLogin` middleware to all
// routes starting with `/admin`
// app.all("#/*", requireLogin, function(req, res, next) {
//   next(); // if the middleware allowed us to get here,
//           // just move on to the next route handler
// });
module.exports=router;
