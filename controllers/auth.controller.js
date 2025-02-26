const AuthService = require("../services/auth");

const Signup = async (req, res) => {
  const payload = req.body; // username, password, email
  const signupResponse = await AuthService.Signup({
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });

  res.status(signupResponse.code).json(signupResponse);
};



const Login = async (req, res) => {
  const payload = req.body; // password, email
  const LoginResponse = await AuthService.Login({
    password: payload.password, 
    email: payload.email,
  });

  res.status(LoginResponse.code).json(LoginResponse);
};

module.exports = {
  Signup,
  Login,
}
