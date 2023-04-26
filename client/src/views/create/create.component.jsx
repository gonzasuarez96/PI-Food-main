import { useState, useEffect } from 'react';
import './create.styles.css';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from '../../redux/actions';

function Create() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    name: '',
    summary: '',
    health_score: '',
    steps: '',
    image: '',
    dietTypes: [],
  });
  const [error, setError] = useState({
    name: 'Requerido',
    summary: '',
    health_score: '',
    steps: '',
    image: '',
    dietTypes: '',
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const validateName = (name) => {
    if (!/^[a-zA-Z]+$/.test(name)) {
      setError({ ...error, name: 'Formato invalido' });
    } else {
      setError({ ...error, name: '' });
    }
  };

  const validateSummary = (summary) => {
    if (!/^[a-zA-Z0-9\s]+$/.test(summary)) {
      setError({ ...error, summary: 'Formato inválido' });
    } else {
      setError({ ...error, summary: '' });
    }
  };

  const validateHealthScore = (health_score) => {
    if (!/^[0-9]+$/.test(health_score)) {
      setError({ ...error, health_score: 'Formato inválido' });
    } else {
      setError({ ...error, health_score: '' });
    }
  };

  const validateSteps = (steps) => {
    if (!/^[a-zA-Z0-9\s]+$/.test(steps)) {
      setError({ ...error, steps: 'Formato inválido' });
    } else {
      setError({ ...error, steps: '' });
    }
  };

  const validateImage = (image) => {
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(image)) {
      setError({ ...error, image: 'Formato inválido' });
    } else {
      setError({ ...error, image: '' });
    }
  };

  const validateDiets = (diets) => {
    if (!/^[a-zA-Z\s]+$/.test(diets)) {
      setError({ ...error, dietTypes: 'Formato inválido' });
    } else {
      setError({ ...error, dietTypes: '' });
    }
  };

  function isFormValid() {
    return (
      error.name === "" &&
      error.summary === "" &&
      error.health_score === "" &&
      error.steps === "" &&
      error.dietTypes === ""
    );
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    switch (name) {
      case 'name':
        validateName(value);
        break;
      case 'summary':
        validateSummary(value);
        break;
      case 'health_score':
        validateHealthScore(value);
        break;
      case 'steps':
        validateSteps(value);
        break;
      case 'image':
        validateImage(value);
        break;
      case 'dietTypes':
        validateDiets(value);
        break;
      default:
        break;
    }
  }

  const handleChangeSelect = (e) => {
    e.preventDefault();
    if (!input.dietTypes.includes(e.target.value))
      return setInput({
        ...input,
        dietTypes: [...input.dietTypes, e.target.value],
      });
  };




  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
  //   const recipe = {};
  //   formData.forEach((value, key) => {
  //     recipe[key] = value;
  //   });
  //   dispatch(createRecipe(recipe));
  //   // limpiar el formulario o redireccionar a otra página
  //   alert('Recipe added!');
  //   // Limpiar el formulario
  //   setInput({
  //     name: '',
  //     summary: '',
  //     health_score: '',
  //     steps: '',
  //     image: '',
  //     diets: '',
  //   });
  // }

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.summary && input.health_score && input.steps && input.dietTypes  ) {
      dispatch(createRecipe(input))
        alert("Receta creada");

      setInput({
        name: "",
        image: "",
        summary: "",
        health_score: "",
        steps: "",
        dietTypes: [],
      });
      history.push("/home");
    } else {
      alert("There is incomplete data");
    }
  };
    
  

  

  return (
      <div className="App">
        <div className='nav'>
          <Link to={'/home'}>
            <button>Back</button>
          </Link>
        </div>
        <br/>
        <br/>
        <br/>
        <div className='contenido'>
        <form onSubmit={(e) => handleChangeSubmit(e)}>
          <div>
            <label> Name </label>
            <input name='name' value={input.name} onChange={handleChange}/>
            <span>{error.name}</span>
          </div>
          <div>
            <label> Summary </label>
            <input name='summary' value={input.summary} onChange={handleChange}/>
            <span>{error.summary}</span>
          </div>
          <div>
            <label> Health score </label>
            <input name='health_score' value={input.health_score} onChange={handleChange}/>
            <span>{error.health_score}</span>
          </div>
          <div>
            <label> Steps </label>
            <input name='steps' value={input.steps} onChange={handleChange}/>
            <span>{error.steps}</span>
          </div>
          <div>
            <label> Image </label>
            <input name='image' value={input.image} onChange={handleChange}/>
            <span>{error.image}</span>
          </div>
          <div>
            <label>Diets: </label>
            <select onChange={(e) => handleChangeSelect(e)} defaultValue="default">
              <option default></option>
                {diets?.map((d) => {
                  return (
                    <option key={d.name} name="dietTypes" value={d.name}>
                          {d.name}
                    </option>
                  );
              })}
            </select>
          </div>
          <br/>
          <div className='btnSubmit'>
          <button  type="submit" disabled={!isFormValid()}>Submit</button>
          </div>
        </form>
        </div>       
      </div>
  );
}

export default Create;

