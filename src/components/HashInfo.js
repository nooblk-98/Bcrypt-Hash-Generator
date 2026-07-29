'use client';

/**
 * HashInfo.js — Display parsed metadata from a bcrypt hash.
 * Shows algorithm, version, rounds, salt, and length.
 */
import { parseHash } from '@/utils/hashInfo';

/**
 * @param {object} props
 * @param {string} props.hash - The bcrypt hash to parse
 */
export default function HashInfo({ hash }) {
  const info = parseHash(hash);

  if (!info) return null;

  const rows = [
    { label: 'Algorithm', value: 'bcrypt' },
    { label: 'Version',   value: `$${info.version}$` },
    { label: 'Rounds',    value: String(info.rounds) },
    { label: 'Salt',      value: info.salt, mono: true },
    { label: 'Length',    value: `${info.length} characters` },
  ];

  return (
    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 animate-fade-in">
      <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
         Hash Information
      </h3>
      <dl className="space-y-2">
        {rows.map(({ label, value, mono }) => (
          <div key={label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-gray-500 font-medium w-20 shrink-0">{label}</dt>
            <dd className={`text-gray-800 text-right break-all ${mono ? 'font-mono text-xs' : ''}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
