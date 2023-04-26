import './detail.styles.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipeDetail);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className='nav'>
        <Link to="/home">
        <button>Back</button>
        </Link>
      </div>
      <div className='bgDetail'>
        <h1>{recipe.name}</h1>
        <div className='contenido'>
          <img className='img' src={recipe.image} alt="Img not found" />
          <h3>Health Score: </h3>
          <h4>{`${recipe.healthScore}%`}</h4>
          {/* <h3>Id:</h3>
          <h4>{id}</h4> */}
          <h3>Diets Type: </h3>
          {recipe.diets ? (
            <div>
              {recipe.diets.map((d) => {
                if (typeof recipe.diets[0] === "object") {
                  return <h4 key={d.name}>{d.name}</h4>;
                }
                return <h4 key={d}>{d}</h4>;
              })}
            </div>
          ) : (
            <h4>Not diets</h4>
          )}
        </div>
      </div>
      <div className='bgDetail2'>
        <div className='contenido3'>
          <h3>Summary: </h3>
          <p>{recipe.summary?.replace(/<[^>]*>/g, "")}</p>
        </div>
      </div>
      {Array.isArray(recipe.steps) ? (
        <div className='bgDetail2'>
          <div className='contenido3'>
            <h3>Instructions:</h3>
            <div>
              {recipe.steps?.map((a) => {
                return (
                  <div>
                    <p>Step {a.number}: </p>
                    <p>{a.step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>{recipe.steps}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;