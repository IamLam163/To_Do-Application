import User from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const test = (req, res) => {
  res.status(200).json("API is working!");
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "Empty Set, No Users Found!" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.toString());
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is a required field! Please enter your name",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is a required field! Please enter your email",
      });
    }
    if (password.length < 6) {
      return res.json({
        error: "Password should be at least 6 characters long",
      });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User exists! Login Instead" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json({ user });
  } catch (error) {
    console.log(error.toString());
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "Email field cannot be empty! Please input a valid email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No User Found!" });
    }

    if (!password) {
      return res.json({
        error: "Password field cannot be empty! Please input your password",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
            },
            token: token,
          });
        },
      );
    } else {
      return res.json({
        error: "Incorrect Password. Try Again!",
      });
    }
  } catch (error) {
    console.log(error.toString());
  }
};

export const logOutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged Out Successfully!" });
};
