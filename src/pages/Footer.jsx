import { Link } from 'react-router';
import '../styles/footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/Privacy">Privacy Policy</Link>
          <span className="footer-divider">|</span>
          <Link to="/Terms">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}

  
  