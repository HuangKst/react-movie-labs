// components/CreditsList.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreditItem from '../credits';

const CreditsList = ({ credits }) => {
  if (!credits || credits.length === 0) {
    return <Typography variant="body2">No cast information available.</Typography>;
  }

  return (
    <div style={{ padding: "15px" }}>
      <Typography variant="h5" gutterBottom>Credits</Typography>
      <Grid container spacing={2}>
        {credits.map((cast, index) => (
          cast ? ( // 确保 cast 不为空
            <CreditItem key={cast.id || index} cast={cast} />
          ) : null
        ))}
      </Grid>
    </div>
  );
};

export default CreditsList;
