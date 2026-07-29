'use client';

/**
 * Verifier.js — Verify a plain-text password against a bcrypt hash.
 */
import { useState } from 'react';
import { verifyHash } from '@/utils/bcrypt';
import { useToast } from '@/components/Toast';

export default function Verifier() {
  const toast = useToast();

  const [password, setPassword]         = useState('');
  const [hash, setHash]                 = useState('');
  const [result, setResult]             = useState(null); // true | false | null
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Verify ─────────────────────────────────────────────────────────────────

  async function handleVerify() {
    if (!password.trim() || !hash.trim()) {
      toast('Please enter both a password and a hash.', 'warning');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const matched = await verifyHash(password, hash.trim());
      setResult(matched);
      toast(
        matched ? 'Password matches the hash!' : 'Password does not match.',
        matched ? 'success' : 'error'
      );
    } catch {
      toast('Invalid hash format. Please check your input.', 'error');
    } finally {
      setLoading(false);
    }
  }

  // ── Clear ──────────────────────────────────────────────────────────────────

  function handleClear() {
    setPassword('');
    setHash('');
    setResult(null);
  }

  // ── Key handler — verify on Ctrl+Enter ────────────────────────────────────

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleVerify();
  }

  return (
    <article
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300
                 p-6 flex flex-col gap-5 border border-gray-100"
      aria-label="Verify password against bcrypt hash"
    >
      {/* Card header */}
      <header className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700
                     flex items-center justify-center text-white font-black text-xl shadow"
          aria-hidden="true"
        >
          ✓
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">Verify Password</h2>
          <p className="text-xs text-gray-400">Check if a password matches a bcrypt hash</p>
        </div>
      </header>

      {/* Plain password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="verify-password" className="text-sm font-semibold text-gray-700">
          Plain Password <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <input
            id="verify-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter plain-text password…"
            autoComplete="current-password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none
                       focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all
                       placeholder:text-gray-300"
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600 transition text-base leading-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      {/* Bcrypt hash textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="verify-hash" className="text-sm font-semibold text-gray-700">
          Bcrypt Hash <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="verify-hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder={`Paste bcrypt hash here, e.g.\n$2a$10$N9qo8uLOickgx2ZMRZoMye...`}
          rows={3}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-mono outline-none
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all
                     resize-none placeholder:text-gray-300 leading-relaxed"
          aria-required="true"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          id="btn-verify"
          onClick={handleVerify}
          disabled={loading}
          className="flex-1 min-w-[140px] bg-green-600 hover:bg-green-700 active:scale-95
                     disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold
                     rounded-xl px-4 py-3 text-sm transition-all duration-200
                     flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              Verifying…
            </>
          ) : (
            <>Verify Password</>
          )}
        </button>

        <button
          id="btn-clear-verify"
          onClick={handleClear}
          className="flex-1 min-w-[80px] bg-gray-50 hover:bg-gray-100 active:scale-95
                     text-gray-500 font-semibold rounded-xl px-4 py-3 text-sm transition-all duration-200"
          aria-label="Clear verification fields"
        >
          ✕ Clear
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div
          role="alert"
          aria-live="polite"
          className={`
            flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-sm animate-fade-in
            ${result
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
            }
          `}
        >
          <span className="text-2xl" aria-hidden="true">{result ? '✔️' : '❌'}</span>
          <span>{result ? 'Password Matches!' : 'Password Does Not Match'}</span>
        </div>
      )}
    </article>
  );
}
