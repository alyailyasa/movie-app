import React from 'react';
import { Link } from 'react-router-dom';

const WatchedList = ({watchedList, removeFromWatchedList}) => {

  return (
    <div className="container">
      {watchedList.length > 0 ? (
        <div className="mt-5 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {watchedList.map((movie) => (
            <div key={movie.id} className="max-w-[190px] h-[414px] rounded overflow-hidden shadow-lg bg-[#1a1a1a]">
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[190px] h-[244px] object-cover" />
              </Link>
              <div className="mt-3 flex flex-col flex-wrap px-4 text-white">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-yellow-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  <p>{movie.vote_average.toString().substring(0, 3)}</p>
                </div>
                <Link to={`/movie/${movie.id}`} className="text-left font-bold text-base leading-[20px] max-w-[150px] overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline">{movie.title}</Link>
                <p  className="text-left text-base">
                  {movie.release_date}
                </p>
              </div>
              <div className="mt-6 mb-8 flex items-center justify-center">
                <button
                  onClick={() => removeFromWatchedList(movie)}
                  className="bg-red-500 text-white px-2 py-1.5 rounded"
                >
                  Remove
                </button>
              </div>
            </div> 
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies in the watchlist.</p>
      )}
    </div>
  );
};

export default WatchedList;
