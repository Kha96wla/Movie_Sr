// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import MovieList from './components/MovieList';
// import MovieListHeading from './components/MovieListHeading';
// import SearchBox from './components/SearchBox';
// import AddFavourite from './components/AddFavourite';
// import RemoveFavourites from './components/RemoveFavourites';
// export const API_KEY = 'cefe59e8';
// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [favourites, setFavourites] = useState([]);
//   const [searchValue, setSearchValue] = useState('');

//   const getMovieRequest = async (searchValue) => {
//     // const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d9c7d609`;
//     // const response = await fetch(url);
//     // const responseJson = await response.json();

//     // if (responseJson.Search) {
//     //   setMovies(responseJson.Search);
//     // }

//     const response = await Axios.get(
//       `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`
//     );
//     setMovies(response.data.Search);
//   };

//   useEffect(() => {
//     getMovieRequest(searchValue);
//   }, [searchValue]);

//   useEffect(() => {
//     const movieFavourites = JSON.parse(
//       localStorage.getItem('react-movie-app-favourites')
//     );

//     setFavourites(movieFavourites);
//   }, []);

//   const saveToLocalStorage = (items) => {
//     localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
//   };

//   const AddFavouriteMovie = (movie) => {
//     const newFavouriteList = [...favourites, movie];
//     setFavourites(newFavouriteList);
//     saveToLocalStorage(newFavouriteList);
//   };

//   const removeFavouriteMovie = (movie) => {
//     const newFavouriteList = favourites.filter(
//       (favourite) => favourite.imdbID !== movie.imdbID
//     );

//     setFavourites(newFavouriteList);
//   };

//   return (
//     <div className='container-fluid movie-app'>
//       <div className='row d-flex align-items-center mt-4 mb-4'>
//         <MovieListHeading heading='Movies' />
//         <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
//       </div>
//       <div className='row'>
//         <MovieList
//           movies={movies}
//           handleFavouritesClick={AddFavouriteMovie}
//           favouriteComponent={AddFavourite}
//         />
//       </div>
//       <div className='row d-flex align-items-center mt-4 mb-4'>
//         <MovieListHeading heading='Favourites' />
//       </div>
//       <div className='row'>
//         <MovieList
//           movies={favourites}
//           handleFavouritesClick={removeFavouriteMovie}
//           favouriteComponent={RemoveFavourites}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=d9c7d609`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
