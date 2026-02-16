import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register handling
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // check if exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ message: "New User created!", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed!" });
  }
};

// login handling
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // token signing
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {}
};
