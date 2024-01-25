import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import MovieDetail from './components/MovieDetail';
import WatchedListDetail from './components/WatchedListDetail';

function App() {
  const [watchedList,] = useState([]);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      
       <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail  />} />
          <Route path="/movie-watched" element={<WatchedListDetail watchedList={watchedList} />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
