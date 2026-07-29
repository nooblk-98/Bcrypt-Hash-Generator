'use client';

/**
 * Generator.js — Bcrypt hash generation card.
 * Handles password input, cost factor selection, hash generation,
 * clipboard copy, clear, and displaying HashInfo + StrengthMeter.
 */
import { useState } from 'react';
import { generateHash } from '@/utils/bcrypt';
import { addToHistory } from '@/utils/storage';
import { useToast } from '@/components/Toast';
import StrengthMeter from '@/components/StrengthMeter';
import HashInfo from '@/components/HashInfo';

/** Available cost factor options */
const ROUNDS_OPTIONS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * @param {object} props
 * @param {function} props.onNewHash - Called after a hash is generated (to refresh history)
 */
export default function Generator({ onNewHash }) {
  const toast = useToast();

  const [password, setPassword]         = useState('');
  const [rounds, setRounds]             = useState(10);
  const [hash, setHash]                 = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Generate ───────────────────────────────────────────────────────────────

  async function handleGenerate() {
    if (!password.trim()) {
      toast('Please enter a password.', 'warning');
      return;
    }
    setLoading(true);
    try {
      const generated = await generateHash(password, rounds);
      setHash(generated);

      // Persist to localStorage history
      addToHistory({
        hash: generated,
        rounds: Number(rounds),
        date: new Date().toLocaleString(),
      });

      toast('Hash generated successfully!', 'success');
      if (onNewHash) onNewHash();
    } catch (err) {
      toast('Failed to generate hash. Please try again.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ── Copy ───────────────────────────────────────────────────────────────────

  async function handleCopy() {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      toast('Hash copied to clipboard!', 'success');
    } catch {
      toast('Failed to copy. Please copy manually.', 'error');
    }
  }

  // ── Clear ──────────────────────────────────────────────────────────────────

  function handleClear() {
    setPassword('');
    setHash('');
    setRounds(10);
  }

  // ── Key handler — generate on Enter ───────────────────────────────────────

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleGenerate();
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <article
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300
                 p-6 flex flex-col gap-5 border border-gray-100"
      aria-label="Generate bcrypt hash"
    >
      {/* Card header */}
      <header className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
                     flex items-center justify-center text-white font-black text-xl shadow"
          aria-hidden="true"
        >
          #
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">Generate Bcrypt Hash</h2>
          <p className="text-xs text-gray-400">Enter a password to create a secure hash</p>
        </div>
      </header>

      {/* Password input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="gen-password" className="text-sm font-semibold text-gray-700">
          Password <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <input
            id="gen-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter password to hash…"
            autoComplete="new-password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                       placeholder:text-gray-300"
            aria-describedby="gen-strength"
            aria-required="true"
          />
          {/* Toggle visibility */}
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

        {/* Live strength meter */}
        <div id="gen-strength">
          <StrengthMeter password={password} />
        </div>
      </div>

      {/* Cost factor dropdown */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="gen-rounds" className="text-sm font-semibold text-gray-700">
          Cost Factor (Rounds)
        </label>
        <select
          id="gen-rounds"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white
                     appearance-none cursor-pointer"
        >
          {ROUNDS_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}{r === 10 ? ' (default)' : ''}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400">
          Higher rounds = more secure but slower. Round 10 ≈ 100ms.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          id="btn-generate"
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 active:scale-95
                     disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold
                     rounded-xl px-4 py-3 text-sm transition-all duration-200
                     flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              Generating…
            </>
          ) : (
            <> Generate Hash</>
          )}
        </button>

        <button
          id="btn-copy-hash"
          onClick={handleCopy}
          disabled={!hash}
          className="flex-1 min-w-[110px] bg-gray-100 hover:bg-gray-200 active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold
                     rounded-xl px-4 py-3 text-sm transition-all duration-200"
          aria-label="Copy hash to clipboard"
        >
           Copy Hash
        </button>

        <button
          id="btn-clear-gen"
          onClick={handleClear}
          className="flex-1 min-w-[80px] bg-gray-50 hover:bg-gray-100 active:scale-95
                     text-gray-500 font-semibold rounded-xl px-4 py-3 text-sm transition-all duration-200"
          aria-label="Clear all fields"
        >
          ✕ Clear
        </button>
      </div>

      {/* Hash output */}
      {hash && (
        <div className="flex flex-col gap-2 animate-fade-in">
          <label className="text-sm font-semibold text-gray-700">Generated Hash</label>
          <div
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-xs
                       text-gray-800 break-all select-all leading-relaxed"
            aria-live="polite"
            aria-label="Generated bcrypt hash output"
          >
            {hash}
          </div>

          {/* Hash information panel */}
          <HashInfo hash={hash} />
        </div>
      )}
    </article>
  );
}
