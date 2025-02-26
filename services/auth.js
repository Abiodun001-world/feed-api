const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Login = async ({ email, password }) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    return {
      code: 400,
      success: "false",
      data: null,
      message: "Invalid credentials",
    };
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return {
      code: 400,
      success: "false",
      data: null,
      message: "Invalid credentials",
    };
  }

  const token = await jwt.sign({ email });

  return {
    code: 200,
    success: "true",
    data: { user, token },
    message: "Login Successful",
  };
};

// Payload
// }

const Signup = async ({ username, password, email }) => {
  const newUser = await new userModel.create({
    username,
    email,
    password,
  });
  const token = await jwt.sign({ email });

  return {
    code: 201,
    success: "true",
    data: {
      user: newUser,
      token,
    },
  };
};

module.exports = {
  Login,
  Signup,
};
