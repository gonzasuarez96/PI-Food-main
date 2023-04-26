import './navBar.styles.css';
import { Link } from 'react-router-dom'

function NavBar({handleChange, handleSubmit}) {
  return (
      <div className='bgHyC'>
        <form onChange={(e)=>handleChange(e)}>
          <div className='bgIyBtn'>
          <input placeholder='Busqueda' type='search' />
          <button type='submit' onClick={handleSubmit}>Buscar</button>
          </div>
          <div>
             <Link to="/create">
             <button>Create</button>
             </Link>
          </div>
        </form>        
      </div>
  );
}

export default NavBar;
