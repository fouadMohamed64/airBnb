import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
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
};

export const getProfile = async (req, res) => {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};

export const updateProfile = async (req, res) => {
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

};
