import {React,useState} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Pagination, Box, Typography } from '@mui/material';
import Pagenation from '../components/pagination'
const HomePage = (props) => {

  const [page, setPage] = useState(1);
 // const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
  const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
    keepPreviousData: true, // Helps in smoother transitions between pages
  });
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

 
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true ;

  // Pagination Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />

        <Pagenation
        currentPage={page}
        totalPages={500} // Example: Total pages from API
        onPageChange={handlePageChange}
        />
      

    </>
);
};
export default HomePage;