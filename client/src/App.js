import './App.css';
import { Route } from 'react-router-dom'
import Create from './views/create/create.component';
import Detail from './views/detail/detail.component';
import Home from './views/home/home.component';
import Landing from './views/landing/landing.component';

function App() {
  return (
      <div>
        <Route exact path='/' component={ Landing }/>
        <Route exact path='/home' component={ Home }/>
        <Route path='/home/:id' component={ Detail }/>
        <Route path='/create' component={ Create }/>
      </div>

  );
}

export default App;