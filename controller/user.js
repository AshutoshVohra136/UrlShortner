const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
async function userSignup(req, res) {
  const { email, password, name } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

// async function userLogin(req, res) {
//   const { email, password } = req.body;

//   const user = await User.findOne({
//     email,
//     password,
//   });

//   if (!user) {
//     return res.render("login", {
//       error: "Imvalid Username Or Password",
//     });
//   }

//   // if everything is fine first create a session id

//   // const sessionID = uuidv4();

//   // storing sessionId with User Object
//   const token = setUser(user);

//   // creating a cookie

//   //  syntax
//   // cookie('CookieName',uid)
//   res.cookie("uid", token);

//   return res.redirect("/");
// }

// here  we send jwt inside header:Authorization Instead of Cookies

async function userLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.render("login", {
      error: "Imvalid Username Or Password",
    });
  }

  // if everything is fine first create a session id

  // const sessionID = uuidv4();

  // storing sessionId with User Object
  const token = setUser(user);

  // creating a cookie

  //  syntax
  // cookie('CookieName',uid)
  // res.cookie("uid", token);
  // res.cookie("uid", token);

  // return res.redirect("/");
  return res.json({
    token,
  });
}

module.exports = { userSignup, userLogin };
