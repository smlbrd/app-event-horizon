import linkedinLogo from '../assets/InBug-Black.png';
import githubLogo from '../assets/github-mark.svg';

const Footer = () => (
  <footer
    className="d-flex flex-column align-items-center"
    style={{
      width: '100%',
      zIndex: 100,
    }}
  >
    <div className="d-flex justify-content-center mb-2">
      <a
        href="https://www.linkedin.com/in/wren-h"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
        aria-label="LinkedIn"
      >
        <img src={linkedinLogo} alt="LinkedIn" width={40} height={40} />
      </a>
      <a
        href="https://github.com/smlbrd"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
        aria-label="GitHub"
      >
        <img src={githubLogo} alt="GitHub" width={40} height={40} />
      </a>
    </div>
    <p className="fw-semibold mb-0 small text-center">
      Developed by Wren Hawthorne
    </p>
  </footer>
);

export default Footer;
