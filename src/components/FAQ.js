'use client';

/**
 * FAQ.js — Accessible accordion FAQ section.
 * Uses native <details>/<summary> — zero extra JS, keyboard-navigable.
 */

const faqs = [
  {
    q: 'What is bcrypt?',
    a: `Bcrypt is a password-hashing function designed by Niels Provos and David Mazières in 1999,
        based on the Blowfish cipher. It incorporates a salt to protect against rainbow-table attacks
        and is intentionally slow — making brute-force attacks computationally expensive even with modern hardware.`,
  },
  {
    q: 'Why use bcrypt for passwords?',
    a: `Bcrypt is the industry standard for password hashing because it is adaptive — you can
        increase the cost factor as hardware becomes faster, ensuring the hash stays difficult to crack.
        Unlike MD5 or SHA-1 (which are designed for speed), bcrypt is purpose-built for passwords
        and naturally resists brute-force and rainbow-table attacks.`,
  },
  {
    q: 'What is the Cost Factor (Rounds)?',
    a: `The cost factor (or work factor) controls how computationally intensive hashing is.
        A cost of 10 means bcrypt performs 2^10 = 1,024 internal iterations. Higher values are
        more secure but slower. The default of 10 is a well-balanced choice for most web applications —
        it takes ~100ms to hash. Each increase by 1 doubles the hashing time.`,
  },
  {
    q: 'Can bcrypt be decrypted?',
    a: `No. Bcrypt is a one-way hashing algorithm — not encryption. Once hashed, there is no
        mathematical way to reverse it back to the original password. Verification works by hashing
        the candidate password with the same salt and comparing the result to the stored hash.`,
  },
  {
    q: 'Is bcrypt still secure?',
    a: `Yes. Bcrypt with a sufficient cost factor remains a strong, widely-recommended choice for
        password hashing. Modern alternatives like Argon2id (winner of the Password Hashing Competition)
        and scrypt also exist and offer memory-hard properties. However, bcrypt at cost 12+ is still
        considered very secure and is actively used in millions of production systems.`,
  },
  {
    q: 'What does the bcrypt hash format look like?',
    a: `A bcrypt hash looks like: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
        It contains: the algorithm version ($2a$), the cost factor (10), a 22-character base64-encoded
        salt, and a 31-character hash output — always 60 characters total.`,
  },
];

export default function FAQ() {
  return (
    <section
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
      aria-labelledby="faq-heading"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600
                     flex items-center justify-center text-white font-black text-xl shadow"
          aria-hidden="true"
        >
          ?
        </div>
        <div>
          <h2 id="faq-heading" className="text-xl font-bold text-gray-800 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-400">Everything you need to know about bcrypt</p>
        </div>
      </div>

      {/* FAQ items */}
      <div className="space-y-3" role="list">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group border border-gray-200 rounded-xl overflow-hidden"
            role="listitem"
          >
            <summary
              className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer
                         font-semibold text-gray-800 text-sm select-none
                         hover:bg-blue-50 transition-colors duration-200 list-none"
            >
              <span>{faq.q}</span>
              {/* Chevron rotates on open */}
              <span
                className="text-blue-500 shrink-0 transition-transform duration-300
                           group-open:rotate-180 text-base leading-none"
                aria-hidden="true"
              >
                ▾
              </span>
            </summary>
            <div className="px-5 py-4 text-sm text-gray-600 leading-relaxed bg-gray-50
                            border-t border-gray-100">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
