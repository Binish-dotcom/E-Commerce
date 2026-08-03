const iconPaths = {
  bag: (
    <>
      <path d="M6.5 8.5h11l-1 10h-9l-1-10Z" />
      <path d="M9 8.5a3 3 0 0 1 6 0" />
      <path d="m9.5 13 2 2 4-4" />
    </>
  ),
  cart: (
    <>
      <path d="M4 5h2l2 9h8l2-6H7" />
      <path d="M9 19h.01" />
      <path d="M16 19h.01" />
    </>
  ),
  user: (
    <>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 4.5 9 4l1.8 4-1.5 1.2a12 12 0 0 0 5.5 5.5l1.2-1.5 4 1.8-.5 2.5c-.2 1-1 1.8-2.1 1.7C10.5 18.8 5.2 13.5 4.8 6.6 4.7 5.5 5.5 4.7 6.5 4.5Z" />
  ),
  mapPin: (
    <>
      <path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v8H3V7Z" />
      <path d="M14 10h3l3 3v2h-6v-5Z" />
      <path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />,
  shieldCheck: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  badgeCheck: (
    <>
      <path d="m12 3 2.2 2.1 3-.4.7 3 2.6 1.5-1.3 2.8 1.3 2.8-2.6 1.5-.7 3-3-.4L12 21l-2.2-2.1-3 .4-.7-3-2.6-1.5L4.8 12 3.5 9.2l2.6-1.5.7-3 3 .4L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  messageCircle: (
    <>
      <path d="M5 18.5 6.2 15A7 7 0 1 1 9 17.8L5 18.5Z" />
      <path d="M9 11h.01" />
      <path d="M12 11h.01" />
      <path d="M15 11h.01" />
    </>
  ),
  helpCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.8 9a2.4 2.4 0 0 1 4.6 1.1c0 1.8-2.4 2-2.4 3.5" />
      <path d="M12 17h.01" />
    </>
  ),
  users: (
    <>
      <path d="M16 11a4 4 0 1 0-8 0" />
      <path d="M4 20a8 8 0 0 1 16 0" />
      <path d="M18 9a3 3 0 0 1 2.5 4.7" />
      <path d="M20 20a5.5 5.5 0 0 0-2-4.2" />
    </>
  ),
  package: (
    <>
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
    </>
  ),
  refresh: (
    <>
      <path d="M19 8a7 7 0 0 0-12-3l-2 2" />
      <path d="M5 3v4h4" />
      <path d="M5 16a7 7 0 0 0 12 3l2-2" />
      <path d="M19 21v-4h-4" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h4v6H6a2 2 0 0 1-2-2v-4Z" />
      <path d="M20 14h-4v6h2a2 2 0 0 0 2-2v-4Z" />
    </>
  ),
  shirt: (
    <>
      <path d="M8 4 4 7l3 4 1-1v10h8V10l1 1 3-4-4-3-2 2h-4L8 4Z" />
    </>
  ),
  sofa: (
    <>
      <path d="M6 11h12a3 3 0 0 1 3 3v4H3v-4a3 3 0 0 1 3-3Z" />
      <path d="M7 11V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </>
  ),
  beauty: (
    <>
      <path d="M7 9h5v11H7V9Z" />
      <path d="M8 5h3v4H8V5Z" />
      <path d="M15 12h3a2 2 0 0 1 2 2v6h-5v-8Z" />
      <path d="M16 8h2v4h-2V8Z" />
    </>
  ),
  heart: (
    <path d="M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5Z" />
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  facebook: <path d="M14 8h2V4h-2a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M17 7h.01" />
    </>
  ),
  twitter: <path d="M21 5.5c-.7.3-1.4.5-2.2.6A3.7 3.7 0 0 0 12.4 9v.8A10.5 10.5 0 0 1 4 5.6s-3 7 4 10a11 11 0 0 1-5 1.5c7 4 15.5 0 15.5-8.3v-.4c.7-.5 1.3-1.1 1.5-1.9Z" />,
  pinterest: (
    <>
      <path d="M12 21c1-3.5 2-6.5 2-9" />
      <path d="M9.5 14.5A5 5 0 1 1 14 17" />
      <path d="M11 13c-.8-1.8-.2-4 1.7-4.5 2.1-.5 3.3 2.1 1.7 3.8" />
    </>
  ),
};

const Icon = ({ name, className = "h-5 w-5", filled = false }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {iconPaths[name]}
  </svg>
);

export default Icon;
