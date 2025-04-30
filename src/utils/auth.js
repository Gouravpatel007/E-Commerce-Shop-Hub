import { v4 as uuidv4 } from 'uuid';
import { createUser, getUserByEmail, saveToken } from './localStorage';

// Simulate JWT creation
const generateToken = (userId) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }));
  const signature = btoa(uuidv4()); // Simulated signature

  return `${header}.${payload}.${signature}`;
};

export const registerUser = (name, email, password) => {
  try {
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    const user = createUser({ 
      name, 
      email,
      // Password handling omitted for simplicity/security in demo
    });

    const token = generateToken(user.id);
    saveToken(user.id, token);

    return { user, token };
  } catch (error) {
    return { error: 'Failed to register user' };
  }
};

export const loginUser = (email, password) => {
  try {
    const user = getUserByEmail(email);
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Password check skipped in this demo

    const token = generateToken(user.id);
    saveToken(user.id, token);

    return { user, token };
  } catch (error) {
    return { error: 'Failed to login' };
  }
};

export const parseToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.sub || !payload.exp) return null;

    if (payload.exp < Date.now()) return null;

    return { userId: payload.sub };
  } catch (error) {
    return null;
  }
};
