import React from 'react';
import FilmCarousel from '../src/app/components/FilmCarousel';
import { getTopRatedMovies } from '../src/app/utils/api';

export default function Home({ topRatedMovies }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-6">
      <h1 className="text-4xl font-bold">Movie Carousel App</h1>
        <p className="mt-2 text-lg">Welcome to our movie carousel application!</p>
      </header>
      <main>
        <FilmCarousel movies={topRatedMovies} />
      </main>
      <footer className="p-6 bg-gray-800 text-center">
      <p>&copy; {new Date().getFullYear()} Movie Carousel App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const topRatedMovies = await getTopRatedMovies();
  return {
    props: {
      topRatedMovies,
    },
  };
}
