// this file is just like a diary where we keep our authentication sessions

const sessionIdToUserMap = new Map(); // its a hashMap

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = { setUser, getUser };
