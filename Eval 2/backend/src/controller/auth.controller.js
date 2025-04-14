import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const isValidUser = await User.findOne({ email });

  if (isValidUser) {
    return next(errorHandler(400, "User already Exist"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    console.log("Avatar not found");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    console.log("Avatar not uploaded");
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: avatar?.url,
  });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    // Choose ONE of these response methods:
    // Option 1: JSON response with redirect info for frontend to handle
    return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login Successful!",
      redirectUrl: "/dashboard", // Frontend can use this to redirect
      rest,
    });
    
    // Option 2: Direct server redirect (remove the JSON response above if using this)
    // return res.cookie("access_token", token, { httpOnly: true }).redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");

    // Choose ONE of these response methods:
    // Option 1: JSON response with redirect info
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
      redirectUrl: "/"
    });
    
    // Option 2: Direct redirect
    // return res.clearCookie("access_token").redirect("/");
  } catch (error) {
    next(error);
  }
};