import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SeacrhBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const getMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        setMovies([]); 

        const results = await fetchMovies(query);

        if (results.length === 0) {
          toast.error('No movies found for your request.');
        }

        setMovies(results);
      } catch (err) {
        setError(true);
        if (err instanceof Error) {
          console.error('Fetch error:', err.message);
        } else {
          console.error('Unknown error occurred:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && !loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default App;

