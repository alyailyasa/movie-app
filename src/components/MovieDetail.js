import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=dfd426c27ceb6d9813e4e845a429b3b6`
        );
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error('Error fetching movie details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const formatDate = (releaseDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString('id-ID', options);
    const capitalizedMonth = formattedDate.replace(/\b\w/g, (match) => match.toUpperCase());
    return capitalizedMonth;
  };

  
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-[100px] mx-auto px-[100px] p-8 text-white">
      <div key={movie.id} className="max-w-full">
        <div className="flex xl:flex-row flex-col xl:items-start items-center">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[320px] h-[404px] rounded-md object-cover" />
          <div className="mt-3 flex flex-col gap-3 flex-wrap px-4 text-white">
            <div className="mb-3 text-left font-bold text-3xl">{movie.title}</div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <p>{movie.vote_average.toString().substring(0, 3)}</p>
            </div>
            <p className="text-left text-base">
              {formatDate(movie.release_date)}
            </p>
            <p className="mt-5 text-white">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
