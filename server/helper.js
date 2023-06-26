const User = require("./models/User");

exports.validateUsername = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username += Math.floor(Math.random() * 20);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
