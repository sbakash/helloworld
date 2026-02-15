import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";
import { authMiddleware, JWT_SECRET } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role, name: user.name },
  });
});

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.user!.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({
    user: { id: user.id, username: user.username, role: user.role, name: user.name },
  });
});

export default router;
