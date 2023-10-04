const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvaiable = await User.findOne({ email });
  if (userAvaiable) {
    res.status(400);
    throw new Error("User already registered.");
  }
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res
      .status(201)
      .json({ _id: newUser.id, email: newUser.email, message: "User Created" });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  // compare password with hashed password
  const passwordChecks = await bcrypt.compare(password, user.password);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password in not valid.");
  }
  res.status(200).json({ message: "Login the user." });
});

//@desc Show current user
//@route GET /api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Log out current user
//@route POST /api/users/logout
//@access public

module.exports = { registerUser, loginUser, currentUser };
