import {React,useState} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Pagination, Box, Typography } from '@mui/material';

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

<Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: 4 
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Page: {page}
        </Typography>
        <Pagination
          count={500} // The maximum number of pages available from the API
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
      

    </>
);
};
export default HomePage;