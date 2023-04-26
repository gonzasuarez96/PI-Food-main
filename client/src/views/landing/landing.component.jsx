import './landing.styles.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
      <div className='landing-page'>
        <p>Estas en el landing</p>
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
        
      </div>

  );
}

export default Landing;