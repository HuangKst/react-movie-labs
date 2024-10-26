import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlayListAddIcon from "../components/cardIcons/playlistAdd";

const UpcomingPage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discover', getUpcomingMovies)

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    const movies = data.results;
  

  // return (
  //   <PageTemplate
  //     title='Discover Movies'
  //     movies={movies}
  //     selectFavorite={addToFavorites}
  //   />
  // );
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie)=>{
        return<PlayListAddIcon movie={movie}/>
      }}
     
      
    />
);
};
export default UpcomingPage;