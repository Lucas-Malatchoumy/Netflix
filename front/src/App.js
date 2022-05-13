import logo from './logo.svg';
import Register from './pages/register';
import Home from './pages/home';
import { Routes, Route } from "react-router-dom"
import Movie from './components/movie'
import './App.css';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Login from './pages/login';
import Fav from './pages/favourite';
import Search from './pages/search';
import ProtectedRoutes from './components/privateRoute';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoutes/>}>
            <Route path='/movies/:movieId' element={<Movie />} ></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/search-results' element={<Search />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/favourite' element={<Fav />}></Route>
        </Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
