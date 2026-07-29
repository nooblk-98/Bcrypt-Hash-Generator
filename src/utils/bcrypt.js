/**
 * bcrypt.js — Wrapper utilities around bcryptjs
 * Provides async generate and verify functions.
 */
import bcrypt from 'bcryptjs';

/**
 * Generate a bcrypt hash for a given plain-text password.
 * @param {string} password - The plain-text password
 * @param {number} rounds - The cost factor (salt rounds)
 * @returns {Promise<string>} The generated bcrypt hash
 */
export async function generateHash(password, rounds) {
  const salt = await bcrypt.genSalt(Number(rounds));
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain-text password against a bcrypt hash.
 * @param {string} password - The plain-text password
 * @param {string} hash - The bcrypt hash to verify against
 * @returns {Promise<boolean>} True if the password matches the hash
 */
export async function verifyHash(password, hash) {
  return bcrypt.compare(password, hash);
}
