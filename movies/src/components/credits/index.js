// components/CreditItem.js
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const CreditItem = ({ cast }) => {
  
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card sx={{ maxWidth: 150, height: 300, textAlign: 'center', margin: '0 auto' }}>
        <CardMedia
          component="img"
          height="200"
          image={
            cast.profile_path 
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` 
              : 'https://via.placeholder.com/150' // 默认图片
          }
          alt={cast.name}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            {cast.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cast.character}
          </Typography>
          
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreditItem;