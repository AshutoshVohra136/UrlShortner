// this file is just like a diary where we keep our authentication sessions

// const sessionIdToUserMap = new Map(); // its a hashMap

const jwt = require("jsonwebtoken");
const secretkey = "ashu##@loopNODE754";
// now we need to create tokens for user.

function setUser(user) {
  //  secretKey is very imp whoever has this can create our token.

  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  //  here in jwt.sign(payload,secretKey)
  return jwt.sign(payload, secretkey);
}

// this set user function will create tokens for us.

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretkey);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
