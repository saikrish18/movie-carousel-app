import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { getTopRatedMovies, fetchMovieDetails } from "../utils/api";
import "../globals.css";

const FilmCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchMovies();
    adjustVisibleMovies();
    window.addEventListener("resize", adjustVisibleMovies);
    return () => {
      window.removeEventListener("resize", adjustVisibleMovies);
    };
  }, []);

  const fetchMovies = async () => {
    const topRatedMovies = await getTopRatedMovies();
    setMovies(topRatedMovies);
  };

  const adjustVisibleMovies = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      setVisibleMovies(5);
    } else if (windowWidth >= 640) {
      setVisibleMovies(3);
    } else {
      setVisibleMovies(1);
    }
  };
  const handleMovieClick = (movie) => {
    fetchMovieDetails(movie.id).then((details) => {
      setSelectedMovie(details);
    });
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    carouselRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Rated Movies</h2>
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto transition-transform duration-300 ease-in-out space-x-4"
          style={{
            scrollSnapType: "x mandatory",
            gridTemplateColumns: `repeat(${visibleMovies}, minmax(0, 1fr))`,
          }}
        >
          {movies.slice(0, 10).map((movie) => (
            <div
              key={movie.id}
              className="w-64  p-4 cursor-pointer movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="w-auto h-auto mb-5 rounded"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm">{movie.overview}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
        {selectedMovie && (
          <Modal onClose={closeModal}>
            <div className="flex flex-col items-center p-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={`${selectedMovie.title} Poster`}
                className="w-40 h-auto mb-2 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">
                {selectedMovie.title}
              </h2>
              <p className="text-sm mb-4">{selectedMovie.overview}</p>
              <p>Release Date: {selectedMovie.release_date}</p>

              <h3 className="text-lg font-semibold mb-1">Cast:</h3>
              <ul className="list-disc pl-6">
                {selectedMovie.cast.map((castMember) => (
                  <li key={castMember.id}>{castMember.name}</li>
                ))}
              </ul>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FilmCarousel;
