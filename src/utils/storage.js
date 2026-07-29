/**
 * storage.js — localStorage helpers for hash history.
 * Stores up to MAX_HISTORY_ITEMS entries.
 */

const STORAGE_KEY = 'bcrypt_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Retrieve the stored hash history array.
 * @returns {Array} Array of history entry objects
 */
export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Add a new hash entry to history (prepend, trim to max).
 * @param {{ hash: string, rounds: number, date: string }} entry
 * @returns {Array} Updated history array
 */
export function addToHistory(entry) {
  const history = getHistory();
  const updated = [entry, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Remove a history entry by its index.
 * @param {number} index
 * @returns {Array} Updated history array
 */
export function removeFromHistory(index) {
  const history = getHistory();
  history.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return [...history];
}

/**
 * Clear all history.
 * @returns {Array} Empty array
 */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}
