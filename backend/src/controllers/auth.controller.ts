import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

// Example usage to avoid unused import error
const saltRounds = 10;
const samplePassword = "example";
bcrypt.hash(samplePassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});

export const SignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      email,
      password : hashedPassword,
      createdAt: new Date(),
    });
    await user.save();
    res.status(200).json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login Controller
export const SignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log (email, password)
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password", success: false });
      return;
    }
    console.log (user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or 50", success: false });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


