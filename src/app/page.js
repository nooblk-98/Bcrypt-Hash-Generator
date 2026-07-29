'use client';

/**
 * page.js — Home page: hero, generator, verifier, history, FAQ.
 */
import { useState } from 'react';
import Generator from '@/components/Generator';
import Verifier  from '@/components/Verifier';
import History   from '@/components/History';
import FAQ       from '@/components/FAQ';

export default function HomePage() {
  /**
   * Incrementing this key causes History to re-read localStorage
   * after a new hash is generated in Generator.
   */
  const [historyKey, setHistoryKey] = useState(0);

  function handleNewHash() {
    setHistoryKey((k) => k + 1);
  }

  return (
    <main id="main-content" className="flex-1">

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-900 to-indigo-900
                   text-white"
        aria-labelledby="hero-heading"
      >
        {/* Decorative background blobs */}
        <div aria-hidden="true"
             className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div aria-hidden="true"
             className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
        <div aria-hidden="true"
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border
                          border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            100% Free — Runs Entirely in Your Browser
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3"
          >
            Bcrypt Hash{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Generator
            </span>
            <br />
            <span className="text-lg sm:text-xl font-bold text-blue-300">
              & Password Verifier
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-blue-100 text-sm sm:text-base leading-relaxed mb-0">
            Generate secure bcrypt hashes and verify passwords instantly.
            Customizable cost factor from 4 to 15. No data is ever sent to a server.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GENERATOR + VERIFIER (side-by-side on desktop)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
        aria-label="Generator and verifier tools"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Generator onNewHash={handleNewHash} />
          <Verifier />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HASH HISTORY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <History refreshKey={historyKey} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <FAQ />
      </section>

    </main>
  );
}
