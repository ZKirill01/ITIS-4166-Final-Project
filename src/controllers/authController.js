import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const { username, email, password } = req.body;
  const newUser = await signUp(username, email, password);
  res.status(201).json(newUser);
}

export async function logInHandler(req, res) {
  const { email, password } = req.body;
  const accessToken = await logIn(email, password);
  res.status(200).json({ accessToken });
}
