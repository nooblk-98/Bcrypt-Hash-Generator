/**
 * passwordStrength.js — Calculate password strength score and label.
 * Considers: length, uppercase, lowercase, numbers, symbols.
 */

/**
 * Evaluate password strength.
 * @param {string} password
 * @returns {{ score: number, label: string, color: string, percent: number }}
 */
export function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: '', color: '', percent: 0 };
  }

  let score = 0;

  // Length scoring
  if (password.length >= 8)  score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety scoring
  if (/[A-Z]/.test(password))       score += 1; // Uppercase
  if (/[a-z]/.test(password))       score += 1; // Lowercase
  if (/[0-9]/.test(password))       score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Symbols

  // Map score to label/color
  let label, color, percent;

  if (score <= 1) {
    label = 'Very Weak';  color = '#ef4444'; percent = 10;
  } else if (score <= 2) {
    label = 'Weak';       color = '#f97316'; percent = 30;
  } else if (score <= 3) {
    label = 'Medium';     color = '#eab308'; percent = 50;
  } else if (score <= 5) {
    label = 'Strong';     color = '#22c55e'; percent = 75;
  } else {
    label = 'Very Strong'; color = '#3b82f6'; percent = 100;
  }

  return { score, label, color, percent };
}
