import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, TikTok } from '@mui/icons-material';

const CreditsSlider = ({ data }) => {
    if (!data) return null;
    console.log(data)
    return (
      <Card sx={{ width: 300, padding: 2, borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" justifyContent="center">
          <Avatar src={`https://image.tmdb.org/t/p/w300${data.profile_path}`} alt={data.name} sx={{ width: 100, height: 100 }} />
        </Box>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {data.name}
          </Typography>
      
          <Typography variant="subtitle1" gutterBottom>
            Known For: {data.known_for_department}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Known Credits: {data.known_credits}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Gender: {data.gender === 1 ? 'Female' : 'Male'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Birthday: {data.birthday}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Place of Birth: {data.place_of_birth}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Also Known As:
          </Typography>
          <List dense>
            {data.also_known_as?.map((alias, index) => (
              <ListItem key={index}>
                <ListItemText primary={alias} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };
  
  export default CreditsSlider;
