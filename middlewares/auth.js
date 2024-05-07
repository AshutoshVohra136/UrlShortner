const { getUser } = require("../service/auth");

//  AUTHENTICATION
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

// Role like :- Admin

// checking  authorization

//  AUTHORIZATION
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    next();
  };
}

// restrictFunction With Cookies

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;

//   if (!userUid) return res.redirect("/login");

//   const user = getUser(userUid);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// restrictFunction Without Cookies
// now instead of cookies we use
//  header{Authorization } to verify JWT.

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.headers["authorization"];

//   //  userUid = "Bearer 1232X)@$#!@"

//   const token = userUid.split("Bearer ")[1];

//   // after split operation we got token=['' ,1232X)@$#!@] we only want token so we write index [1]
//   if (!userUid) return res.redirect("/login");

//   const user = getUser(token);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// checkAuthFunction With Cookies
// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

// checkAuthFunction Without Cookies

// async function checkAuth(req, res, next) {
//   const userUid = req.headers["authorization"];

//   //  userUid = "Bearer 1232X)@$#!@"

//   const token = userUid.split("Bearer ")[1];
//   // const userUid = req.cookies?.uid;

//   const user = getUser(token);

//   req.user = user;
//   next();
// }
// module.exports = { restrictToLoggedInUserOnly, checkAuth };
module.exports = { checkForAuthentication, restrictTo };
