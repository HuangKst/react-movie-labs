import React from "react";
import { getTopRateMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
const TopRatePage = () => {

    const {  data, error, isLoading, isError }  = useQuery('TopRatedMovies', getTopRateMovies)

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }

    const movies = data.results;
    const favorites = movies.filter(m => m.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  


  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie)=>{
        return(
          <div>
                <PlayListAddIcon movie={movie}/>
                <AddToFavoritesIcon movie={movie}/>
          </div>
        )
                

      }} 
    />
);
};
export default TopRatePage;