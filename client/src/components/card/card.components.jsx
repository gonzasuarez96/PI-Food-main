import './card.styles.css';
import { Link } from 'react-router-dom';

function Card({recipe}) {
  return (
      <div className='card'>
        <div className='infoCard'>
          <img src={recipe.image} alt="Img not found"></img>
        </div>
          <div className='btnI'>
            <div>
              <h3>{recipe.name}</h3>
            </div>
            <Link to={`/home/${recipe.id}`}>
              <button title="Click to open details">i</button>
            </Link>
          </div>
          <br/>
          <div className='infoCard3'>
            <div className='infoCard2'>
              <div>{recipe.diets? recipe.diets.map((t) => <h5 key={t}>{t}</h5>) : <h5>Not Diets</h5>}</div>
            </div>
          </div>
          <br/>
      </div>
  );
}

export default Card;
