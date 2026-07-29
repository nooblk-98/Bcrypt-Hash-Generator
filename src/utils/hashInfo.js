/**
 * hashInfo.js — Parse a bcrypt hash and extract metadata.
 * Bcrypt hash format: $2a$10$<22-char salt><31-char hash>
 */

/**
 * Parse a bcrypt hash string into its component parts.
 * @param {string} hash - A valid bcrypt hash string
 * @returns {object|null} Parsed hash info or null if invalid
 */
export function parseHash(hash) {
  if (!hash || typeof hash !== 'string') return null;

  // Bcrypt hash format: $<version>$<rounds>$<22 char salt><31 char hash>
  const regex = /^\$([0-9a-z]+)\$(\d+)\$([./A-Za-z0-9]{22})([./A-Za-z0-9]{31})$/;
  const match = hash.match(regex);

  if (!match) return null;

  return {
    algorithm: 'bcrypt',
    version: match[1],         // e.g. "2a", "2b"
    rounds: parseInt(match[2], 10),
    salt: match[3],            // 22-character base64 encoded salt
    hashPart: match[4],        // 31-character hash output
    length: hash.length,       // Always 60 for bcrypt
  };
}
