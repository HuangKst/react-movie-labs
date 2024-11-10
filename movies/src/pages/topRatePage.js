import React from "react";
import { getTopRateMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlayListAddIcon from "../components/cardIcons/playlistAdd";

const TopRatePage = () => {

    const {  data, error, isLoading, isError }  = useQuery('discover', getTopRateMovies)

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }

    const movies = data.results;
  


  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie)=>{
        return<PlayListAddIcon movie={movie}/>
      }}
     
      
    />
);
};
export default TopRatePage;