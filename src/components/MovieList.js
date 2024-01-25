import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WatchedList from './WatchedList';


const MovieList = () => {
  
  const [movies, setMovies] = useState([]);

  const [watchedList, setWatchedList] = useState(() => {
    const storedWatchedList = localStorage.getItem('watchedList');
    return storedWatchedList ? JSON.parse(storedWatchedList) : [];
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
    const storedWatchedList = localStorage.getItem('watchedList');
    if (storedWatchedList) {
      setWatchedList(JSON.parse(storedWatchedList));
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };

  }, []);

  const API_KEY = 'dfd426c27ceb6d9813e4e845a429b3b6'

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        console.error('Error fetching movies:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const formatDate = (releaseDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString('id-ID', options);
  
    const capitalizedMonth = formattedDate.replace(/\b\w/g, (match) => match.toUpperCase());
  
    return capitalizedMonth;
  };
  
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const watchedListFromStorage = JSON.parse(localStorage.getItem('watchedList')) || [];
    const isMovieInWatchedList = watchedListFromStorage.some((watchedMovie) => watchedMovie.id === movie?.id);

    if (movie && isMovieInWatchedList) {
      setMovie((prevMovie) => ({ ...prevMovie, watched: true }));
    }
  }, [movie]);
    
  useEffect(() => {
    const watchedListFromStorage = JSON.parse(localStorage.getItem('watchedList')) || [];
    const watchedMap = {};
    
    watchedListFromStorage.forEach((watchedMovie) => {
      watchedMap[watchedMovie.id] = watchedMovie.watched || false;
    });

    setIsWatched(watchedMap);
  }, []);
  
  const handleMarkAsWatched = (event, selectedMovie) => {
    event.stopPropagation();

    if (selectedMovie && selectedMovie.id) {
      const watchedListFromStorage = JSON.parse(localStorage.getItem('watchedList')) || [];
      const isMovieInWatchedList = watchedListFromStorage.some((watchedMovie) => watchedMovie.id === selectedMovie.id);

      if (!isMovieInWatchedList) {
        const updatedWatchedList = [...watchedListFromStorage, { ...selectedMovie, watched: true }];
        localStorage.setItem('watchedList', JSON.stringify(updatedWatchedList));
        setIsWatched((prev) => ({ ...prev, [selectedMovie.id]: true }));
      } else {
        const updatedWatchedList = watchedListFromStorage.filter((watchedMovie) => watchedMovie.id !== selectedMovie.id);
        localStorage.setItem('watchedList', JSON.stringify(updatedWatchedList));
        setIsWatched((prev) => ({ ...prev, [selectedMovie.id]: false }));
      }
    }
    window.location.reload()
  };
    
    
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    accessibility: true,
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const storedWatchedList = JSON.parse(localStorage.getItem('watchedList')) || [];
    setWatchedList(storedWatchedList);
  }, []);

  const removeFromWatchedList = (movie) => {
    const updatedWatchedList = watchedList.filter((m) => m.id !== movie.id);
    setWatchedList(updatedWatchedList);

    localStorage.setItem('watchedList', JSON.stringify(updatedWatchedList));
    window.location.reload()
  };

  return (
    <div className="container mx-auto text-center md:px-[100px] px-[50px] md:p-8 p-2 mb-[200px]">
      <div className="mt-[80px] text-center">
        <h1 className="text-white text-3xl font-bold mb-3">IaMDB Movies App</h1>
        <p className="mb-1 font-bold">{isOnline ? <div className="text-green-600">Online </div> : <div className="text-red-600">Offline </div>}</p>
      </div>
      <div className="mt-8 flex gap-3 items-center">
        <div className="bg-yellow-500 h-10 w-2"></div>
        <div className="text-2xl text-white">Popular Movie</div>
      </div>
      <div className="mt-5 w-full">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="max-w-[190px] h-[414px] rounded overflow-hidden shadow-lg bg-[#1a1a1a] flex gap-2">
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[190px] h-[244px] object-cover" />
              </Link>
              <div className="mt-3 flex flex-col gap-1 flex-wrap px-4 text-white">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-yellow-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  <p>{movie.vote_average.toString().substring(0, 3)}</p>
                </div>
                <Link to={`/movie/${movie.id}`} className="text-left font-bold text-base leading-[20px] max-w-[150px] overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline">{movie.title}</Link>
                <p className="text-left text-base">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              <div className="mt-6 mb-8 flex items-center justify-center">
                <button
                  onClick={(e) => handleMarkAsWatched(e, movie)}
                  className={`${isWatched[movie.id] ? 'bg-yellow-400' : 'bg-gray-800'} px-7 hover:bg-gray-700 py-2 text-yellow-100 rounded-md flex items-center`}
                >
                  {isWatched[movie.id] ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <p className="text-white ml-2">Watchlist</p>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <p className="ml-2">Watchlist</p>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Link to="/movie-watched">
        <div className="mt-[30px] flex gap-3 items-center">
          <div className="bg-yellow-500 h-10 w-2"></div>
          <div className="text-2xl text-white">Your Watched List</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-white w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </Link>
      <WatchedList watchedList={watchedList} removeFromWatchedList={removeFromWatchedList}/>
    </div>
  );
};

export default MovieList;
