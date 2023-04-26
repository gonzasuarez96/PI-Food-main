import './home.styles.css';
import NavBar from '../../components/navBar/navBar.components';
import Cards from "../../components/cards/cards.components"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getByName, getRecipes, getDiets, orderByAZ, orderByZA, orderHealthScoreAsc, orderHealthScoreDesc, filterDiets, filterOrigin } from '../../redux/actions';



function Home() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state)=>state.allRecipes);
  const diets = useSelector((state) => state.diets)
  const [searchString, setSearchString] = useState('')
  

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }
 
  // const [filtered, setFiltered] = useState(allUsers)
  // const [searchString, setSearchString] = useState('')

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value)
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const filtered = allUsers.filter((user) => user.title.includes(searchString))
  //   setFiltered(filtered)
  // }

  useEffect(()=>{
    dispatch(getRecipes());
    dispatch(getDiets());
  },[dispatch])

  const [page, setPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = page * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const goToPage = (page) => {
    setPage(page);
  };

  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => goToPage(i)}>
        {i}
      </button>
    );
  }


  const [refreshState, setRefreshState] = useState(false);

  const handleSortTitle = (e) => {
      if (e.target.value === "orderAZ") {
          dispatch(orderByAZ(refreshState));
          setRefreshState(true);
          setPage(1);
      } else if (e.target.value === "orderZA") {
          dispatch(orderByZA(refreshState));
          setRefreshState((prevState) => !prevState);
          setPage(1);
      }
  };

  const handleSortScore = (e) => {
    console.log('handleSortScore called with event:', e);
    if (e.target.value === "ascScore") {
        console.log('dispatching orderHealthScoreAsc action');
        dispatch(orderHealthScoreAsc(refreshState));
        setRefreshState((prevState) => !prevState);
        setPage(1);
    } else if (e.target.value === "descScore") {
        console.log('dispatching orderHealthScoreDesc action');
        dispatch(orderHealthScoreDesc(refreshState));
        setRefreshState((prevState) => !prevState);
        setPage(1);
    }
  };

  const handleFilter = (e) => {
    dispatch(filterDiets(e.target.value));
    setPage(1);
};

  const handleOrigin = (e) => {
      dispatch(filterOrigin(e.target.value))
    }
  
  
  return (
      <div className='home-conteiner'>
        <h1 className='home-title'>Estas en el home</h1>
        <div>
          <select onChange={handleSortTitle} defaultValue="default">
              <option default>Sort Title</option>
              <option value="orderAZ">Recipes A-Z</option>
              <option value="orderZA">Recipes Z-A</option>
          </select>
          <select onChange={handleSortScore} defaultValue="default">
              <option default>Sort Score</option>
              <option value="ascScore">Ascendente</option>
              <option value="descScore">Descendente</option>
          </select>
          <select onChange={handleFilter} defaultValue="default">
              <option value="all">All Diets</option>
              {diets.length ? diets.map((e) =>
                <option value={e.name} key={e.id}>{e.name}</option>) : null}
          </select>
          <select onChange={handleOrigin} defaultValue='default'>
              
              <option value="all">All</option>
              <option value="created">Created</option>
              <option value="api">Existent</option>
          </select>
        </div>
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
        <div className='bg'>
        <button onClick={prevPage} disabled={page === 1}>
          Prev
        </button>
        <div className='btn'>{pageButtons}</div>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div> 
        <Cards allRecipes={ currentRecipes }/> 
      </div>

  );
}

export default Home;