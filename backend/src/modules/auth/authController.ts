import { Request, Response } from "express";
import { getOneUserByEmailDB, handleRegisterDB } from "./authService";
import { getHashedPassword, matchPassword } from "../../utils/hashPassword";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/config";

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await getOneUserByEmailDB(email);

    if (!user) {
      res
        .status(401)
        .json({ message: "Wrong email or password.", success: false });
      return;
    }

    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
      res
        .status(401)
        .json({ message: "Wrong email or password.", success: false });
      return;
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      profile: user.profile,
    };

    const token = jwt.sign(userData, JWT_SECRET_KEY);

    res.status(200).json({
      message: "You are logged in successfully.",
      token,
      data: userData,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const handleRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await getOneUserByEmailDB(email);

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email already exists.", success: false });
      return;
    }

    const hashedPassword = await getHashedPassword(password);

    const registerData = {
      username,
      email,
      password: hashedPassword,
    };

    const result = await handleRegisterDB(email, registerData);

    if (!result) {
      res
        .status(500)
        .json({ success: false, message: "Failed to register user." });
      return;
    }

    res.status(201).json({
      message: "You are registered successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
