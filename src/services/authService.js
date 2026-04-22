import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

export async function signUp(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({
    username,
    email,
    password: hashedPassword,
  });
  return newUser;
}

export async function logIn(email, password) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

  const error = new Error('Invalid email or password');
  error.status = 401;

  const user = await findUserByEmail(email);
  if (!user) throw error;

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw error;

  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return accessToken;
}
