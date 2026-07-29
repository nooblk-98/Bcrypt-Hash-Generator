'use client';

/**
 * Toast.js — Lightweight toast notification system.
 * Uses a ToastContext for global access. Renders at the bottom-right.
 */
import { createContext, useContext, useState, useCallback } from 'react';

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Individual Toast Item ─────────────────────────────────────────────────────

const TOAST_STYLES = {
  success: 'bg-green-500 text-white',
  error:   'bg-red-500 text-white',
  info:    'bg-blue-500 text-white',
  warning: 'bg-amber-500 text-white',
};

const TOAST_ICONS = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
};

function ToastItem({ toast }) {
  return (
    <div
      role="status"
      className={`
        flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
        pointer-events-auto animate-fade-in-up min-w-[200px]
        ${TOAST_STYLES[toast.type] || TOAST_STYLES.info}
      `}
    >
      <span className="text-base font-bold shrink-0">
        {TOAST_ICONS[toast.type]}
      </span>
      {toast.message}
    </div>
  );
}

export default ToastProvider;
