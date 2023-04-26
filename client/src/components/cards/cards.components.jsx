import './cards.styles.css';
import Card from '../card/card.components';

function Cards({ allRecipes }) {
  const userList = allRecipes
  return (
    <div className="cards-list">
      {userList.map((recipe) => (
        <Card recipe={recipe} />
      ))}
    </div>
  );
}

export default Cards;
