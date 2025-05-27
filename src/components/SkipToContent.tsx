const skipLinkStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  background: '#fff',
  color: '#007bff',
  padding: '0.5em 1em',
  zIndex: 1000,
  transform: 'translateY(-100%)',
  transition: 'transform 0.2s',
  textDecoration: 'none',
};

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content visually-hidden-focusable"
      style={skipLinkStyle}
      onFocus={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onBlur={(e) => (e.currentTarget.style.transform = 'translateY(-100%)')}
    >
      Skip to content
    </a>
  );
}
