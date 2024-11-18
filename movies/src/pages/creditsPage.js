import React from 'react';
import CreditsSlider from '../components/creditsSidebar';
import { getCreditDetails } from '../api/tmdb-api';
import { useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import { useQuery } from "react-query";

const CreditsPage = () => {
    const { id } = useParams();

   
    const { data: credits, error: creditsError, isLoading: isCreditsLoading } = useQuery(
      ["movie", { id: id }],
      getCreditDetails
    );

    if (isCreditsLoading) return <Spinner />;
    if (creditsError) return <h1>{creditsError.message}</h1>;

    return (
        <>
          {credits ? (
            <>
              <CreditsSlider data={credits}>
                
              </CreditsSlider>
            </>
          ) : (
            <p>Waiting for movie details</p>
          )}
        </>
    );
};

export default CreditsPage;
