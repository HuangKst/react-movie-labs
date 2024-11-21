import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import PaginationComponent from "../components/pagination";

const UpcomingPage = (props) => {

    const [page, setPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(['discover', page], () => getUpcomingMovies(page), {
      keepPreviousData: true, // Helps in smoother transitions between pages
    });

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    const movies = data.results;

    const handlePageChange = (event, value) => {
      setPage(value);
    };
  


  return (
    <>
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie)=>{
        return<PlayListAddIcon movie={movie}/>
      }}
     
      
    />

    <PaginationComponent
    currentPage={page}
    totalPages={500} // Example: Total pages from API
    onPageChange={handlePageChange}
    />
    </>
);
};
export default UpcomingPage;