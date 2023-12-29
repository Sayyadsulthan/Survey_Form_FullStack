import Admin from "../models/Admin.js";
import Survey from "../models/Survey.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv();

export const createAdmin = async (req, res) => {
  try {
    const { name, password, confirmPassword, email } = req.body;
    if (!name || !password || !confirmPassword || !email) {
      res.status(404).json({ success: false, message: "Please fill the data" });
    }

    if (password !== confirmPassword) {
      res.status(402).json({
        success: false,
        message: "Password and confirmPassword not MAtches",
      });
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      res.status(409).json({
        success: false,
        message: "Account Already exist with this email",
      });
    }

    const salt = bcrypt.genSaltSync(Number(process.env.saltRounds));
    const hash = bcrypt.hashSync(password, salt);

    await Admin.create({ email, name, password: hash });

    res.status(201).json({ success: true, message: "Account created" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(401).json({ success: false, message: "Not a valid User" });
      return;
    }

    const isValidPAssword = bcrypt.compareSync(password, admin.password);

    if (!isValidPAssword) {
      res.status(400).json({ success: false, message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { name: admin.name, email: admin.email, _id: admin._id },
      process.env.SecretKey,
      { algorithm: "HS256" }
    );

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getAllSurvey = async (req, res) => {
  try {
    const allSurveys = await Survey.find();

    res.status(200).json({ success: true, data: allSurveys });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const handleRemoveSurvey = async (req, res) => {
  try {
    const { id } = req.params;

    await Survey.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Form removed successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
