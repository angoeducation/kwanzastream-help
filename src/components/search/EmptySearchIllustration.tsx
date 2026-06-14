export function EmptySearchIllustration() {
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Browser window frame */}
      <rect x="20" y="20" width="90" height="70" rx="6" stroke="#9147FF" strokeWidth="3" fill="white" />
      <line x1="20" y1="36" x2="110" y2="36" stroke="#9147FF" strokeWidth="3" />
      {/* Traffic lights */}
      <circle cx="29" cy="28" r="2.5" fill="#9147FF" />
      <circle cx="38" cy="28" r="2.5" fill="#bf5af2" />
      <circle cx="47" cy="28" r="2.5" fill="#e5d9ff" />
      {/* Document lines */}
      <line x1="34" y1="50" x2="96" y2="50" stroke="#e5d9ff" strokeWidth="3" strokeLinecap="round" />
      <line x1="34" y1="60" x2="80" y2="60" stroke="#e5d9ff" strokeWidth="3" strokeLinecap="round" />
      <line x1="34" y1="70" x2="88" y2="70" stroke="#e5d9ff" strokeWidth="3" strokeLinecap="round" />
      {/* Magnifying glass */}
      <circle cx="96" cy="76" r="22" stroke="#9147FF" strokeWidth="3" fill="white" />
      <circle cx="96" cy="76" r="14" stroke="#e5d9ff" strokeWidth="2" fill="none" />
      <line x1="112" y1="92" x2="130" y2="110" stroke="#9147FF" strokeWidth="4" strokeLinecap="round" />
      {/* Question mark inside magnifier */}
      <text x="96" y="82" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9147FF">?</text>
      {/* Purple cloud accents */}
      <ellipse cx="34" cy="118" rx="20" ry="10" fill="#E5D9FF" />
      <ellipse cx="50" cy="113" rx="14" ry="8" fill="#E5D9FF" />
      <ellipse cx="132" cy="38" rx="16" ry="8" fill="#E5D9FF" />
      <ellipse cx="145" cy="32" rx="10" ry="6" fill="#E5D9FF" />
    </svg>
  );
}
