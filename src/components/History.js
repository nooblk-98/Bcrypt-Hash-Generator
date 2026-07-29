'use client';

/**
 * History.js — Hash history panel backed by localStorage.
 * Shows the last 10 generated hashes with copy and delete actions.
 */
import { useState, useEffect } from 'react';
import { getHistory, removeFromHistory, clearHistory } from '@/utils/storage';
import { useToast } from '@/components/Toast';

/**
 * @param {object} props
 * @param {number}  props.refreshKey - Increment this to force a re-read of localStorage
 */
export default function History({ refreshKey }) {
  const toast   = useToast();
  const [history, setHistory] = useState([]);

  // Load history from localStorage — runs client-side only
  useEffect(() => {
    setHistory(getHistory());
  }, [refreshKey]);

  // ── Copy ─────────────────────────────────────────────────────────────────

  async function handleCopy(hash) {
    try {
      await navigator.clipboard.writeText(hash);
      toast('Hash copied to clipboard!', 'success');
    } catch {
      toast('Failed to copy. Please copy manually.', 'error');
    }
  }

  // ── Delete single entry ──────────────────────────────────────────────────

  function handleDelete(index) {
    const updated = removeFromHistory(index);
    setHistory(updated);
    toast('Entry deleted.', 'info');
  }

  // ── Clear all ─────────────────────────────────────────────────────────────

  function handleClearAll() {
    setHistory(clearHistory());
    toast('History cleared.', 'info');
  }

  return (
    <section
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
      aria-labelledby="history-heading"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700
                       flex items-center justify-center text-white text-lg shadow"
            aria-hidden="true"
          >
            🕒
          </div>
          <div>
            <h2 id="history-heading" className="text-xl font-bold text-gray-800 leading-tight">
              Hash History
            </h2>
            <p className="text-xs text-gray-400">Last {history.length || 0} generated hashes</p>
          </div>
          {history.length > 0 && (
            <span className="bg-purple-100 text-purple-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {history.length}
            </span>
          )}
        </div>

        {history.length > 0 && (
          <button
            id="btn-clear-history"
            onClick={handleClearAll}
            className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors
                       px-3 py-1.5 rounded-lg hover:bg-red-50"
            aria-label="Clear all history"
          >
            🗑 Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <span className="text-4xl" aria-hidden="true">📋</span>
          <p className="text-sm text-gray-400 font-medium">No history yet.</p>
          <p className="text-xs text-gray-300">Generate your first hash above to see it here.</p>
        </div>
      ) : (
        <ul className="space-y-3" role="list" aria-label="Generated hash history">
          {history.map((entry, idx) => (
            <li
              key={`${entry.hash}-${idx}`}
              className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 rounded-xl
                         px-4 py-3 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30
                         transition-all duration-200 group"
            >
              {/* Entry info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-1.5">
                  <span>🕒 {entry.date}</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                    Rounds: {entry.rounds}
                  </span>
                </div>
                <p className="font-mono text-xs text-gray-700 break-all leading-relaxed">
                  {entry.hash}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(entry.hash)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg px-3 py-1.5
                             text-xs font-semibold transition-all active:scale-95"
                  aria-label={`Copy hash from ${entry.date}`}
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="bg-red-50 hover:bg-red-100 text-red-500 rounded-lg px-3 py-1.5
                             text-xs font-semibold transition-all active:scale-95"
                  aria-label={`Delete hash from ${entry.date}`}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
