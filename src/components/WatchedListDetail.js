import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
  
const WatchedListDetail = () => {
  const [watchedList, setWatchedList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({ id: null, rating: 0, comment: '' });
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const storedWatchedList = JSON.parse(localStorage.getItem('watchedList')) || [];
    setWatchedList(storedWatchedList);
  }, []);

  const handleReviewClick = (movie) => {
    setCurrentMovie({ id: movie.id, rating: movie.rating || 0, comment: movie.comment || '' });
    setModalOpen(true);
  };
    
  const handleReviewSubmit = () => {
    const movieId = currentMovie.id;
    const updatedWatchedList = watchedList.map((movie) =>
      movie.id === movieId ? { ...movie, rating: currentMovie.rating, comment: currentMovie.comment } : movie
    );

    setWatchedList(updatedWatchedList);
    localStorage.setItem('watchedList', JSON.stringify(updatedWatchedList));

    setCurrentMovie({ id: null, rating: 0, comment: '' });
    setModalOpen(false);
  };

  const handleRatingClick = (movieId, selectedRating) => {
    if (currentMovie.id === null) {
      setWatchedList((prevList) =>
        prevList.map((movie) => (movie.id === movieId ? { ...movie, rating: selectedRating } : movie))
      );
    }
    setCurrentMovie((prevMovie) => ({ ...prevMovie, rating: selectedRating }));
  };

  const handleCommentChange = (event) => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, comment: event.target.value }));
  };

  const formatDate = (releaseDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString('id-ID', options);
    const capitalizedMonth = formattedDate.replace(/\b\w/g, (match) => match.toUpperCase());
    return capitalizedMonth;
  };

  const renderStars = (movie) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= movie.rating ? '#eab308' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 cursor-pointer"
          onClick={() => handleRatingClick(movie.id, i)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }
    return stars;
  };

  const removeFromWatchedList = (movie) => {
    const updatedWatchedList = watchedList.filter((m) => m.id !== movie.id);
    setWatchedList(updatedWatchedList);
    localStorage.setItem('watchedList', JSON.stringify(updatedWatchedList));
  };

  return (
    <div className="container mx-auto md:px-[100px] px-[50px] md:p-8 p-2">
      <div className="mt-[80px]">
          <h2 className="text-3xl font-bold mb-8 text-white">Your Watchlist</h2>
        </div>
      {watchedList.length > 0 ? (
        <div className="w-full flex flex-col gap-5">
          {watchedList.map((movie) => (
            <div key={movie.id} className="max-w-[800px] h-auto p-8 rounded-md overflow-hidden shadow-lg bg-[#1a1a1a]">
              <div className="flex xl:flex-row flex-col xl:items-start items-center mb-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[120px] h-[204px] rounded-md object-cover"
                />
                <div className="mt-3 max-w-[600px] flex flex-col flex-wrap px-4 text-white">
                  <Link to={`/movie/${movie.id}`} className="text-xl text-left font-bold hover:underline">
                    {movie.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#eab308"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                    <p>{movie.vote_average.toString().substring(0, 3)}</p>
                  </div>
                  <p className="text-left text-base">{formatDate(movie.release_date)}</p>
                  <p className="text-white">{movie.overview}</p>
                </div>
              </div>

              {movie.rating && movie.comment && (
                <div className="text-white mt-3 mb-5 flex flex-col max-w-full h-auto py-3 px-5 rounded overflow-hidden shadow-xl bg-[#212121]">
                  <div className="text-white font-bold text-lg">Your Review</div>
                  <div className="mt-3 flex flex-col items-start">
                    <div className="xl:w-[80px] w-auto font-bold">Rating</div>
                    <div className="flex items-center gap-1 text-[#eab308] text-base"> {renderStars(movie)}</div>
                  </div>
                  <div className="mt-3 flex flex-col items-start">
                    <div className="xl:w-[80px] w-auto font-bold">Comment</div>
                    <p>{movie.comment}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleReviewClick(movie)}
                className="bg-blue-500 text-white px-2 py-1 rounded w-[120px] flex gap-1 text-center justify-center items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Review
              </button>
              <div className="mt-5 flex items-start justify-end">
                <button
                  onClick={() => removeFromWatchedList(movie)}
                  className="bg-red-500 text-white px-2 py-1.5 rounded"
                >
                  Remove WatchedList
                </button>
              </div>
                
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReviewSubmit();
                  }}
                >
                  <div className="flex items-center gap-4">
                    <p className="w-[80px]">Rating</p>
                    <p>:</p>
                    <div className="flex text-[#eab308]">{renderStars(currentMovie)}</div>
                  </div>
                  <div className="mt-2 flex items-start gap-4">
                    <p className="w-[80px]">Comment</p>
                    <p>:</p>
                    <textarea
                      id={`comment-${currentMovie.id}`}
                      value={currentMovie.comment}
                      onChange={handleCommentChange}
                      className="xl:w-[500px] w-auto px-2 h-[80px] outline-1 outline-black"
                    />
                  </div>
                  <div className="mt-10 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-1 rounded w-[120px]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies in the watched list.</p>
      )}
    </div>
  );
};

export default WatchedListDetail;