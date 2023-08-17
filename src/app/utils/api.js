import fetch from 'isomorphic-unfetch';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

export async function getTopRatedMovies() {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`
  );
  const data = await response.json();

  const cast = data.credits.cast.map((castMember) => ({
    id: castMember.id,
    name: castMember.name,
  }));

  return {
    ...data,
    cast,
  };
}
