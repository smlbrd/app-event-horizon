export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-link visually-hidden-focusable"
      onFocus={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onBlur={(e) => (e.currentTarget.style.transform = 'translateY(-100%)')}
    >
      Skip to content
    </a>
  );
}
