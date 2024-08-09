import userModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    }

    let hashPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = new userModel({
      ...req.body,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({ newUser, message: "user registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { email: user.email, firstName: user.firstName, role: user.role },
      `${process.env.SECRET}`,
      { expiresIn: "2d" }
    );

    const refreshToken = jwt.sign(
      { email: user.email, username: user.firstName, role: user.role },
      `${process.env.REFRESH}`,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ token, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await userModel
      .findOneAndUpdate({ email: req.user.email }, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
