import { loginService, signupService } from "@/services/auth.service";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { user, token } = await signupService(name, email, password);

    return res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("request come inside login : ", email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { user, token } = await loginService(email, password);

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


