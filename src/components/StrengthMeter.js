'use client';

/**
 * StrengthMeter.js — Visual password strength indicator.
 * Shows a coloured progress bar and a label. Rendered live on every keystroke.
 */
import { getPasswordStrength } from '@/utils/passwordStrength';

/**
 * @param {object} props
 * @param {string} props.password - The password to evaluate
 */
export default function StrengthMeter({ password }) {
  const { label, color, percent } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1" aria-label={`Password strength: ${label}`}>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%`, backgroundColor: color }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Label */}
      <p className="text-xs font-semibold" style={{ color }}>
        {label}
      </p>
    </div>
  );
}
