# react-movie-labs



## Extend the App

### Credits Display Components

#### 1. `CreditsList` Component

- **Description**: The `CreditsList` component is used to display a list of cast members for a movie or series. It accepts a `credits` array as a prop and iterates over this array to render a card for each cast member.
- **Usage**: Pass a `credits` array containing cast data as a prop. If `credits` is `undefined` or an empty array, the component will display the message “No cast information available.”
- Key Implementation Details:
  - Utilizes `Grid` layout to ensure cast cards are displayed responsively across different screen sizes.
  - Performs `undefined` checks on each `cast` item in the `map` function to prevent errors when data is still loading.

#### 2. `CreditItem` Component

- **Description**: The `CreditItem` component displays individual cast member details, including their profile picture, name, character, and episode count.
- **Usage**: The `CreditsList` component passes each `cast` object to `CreditItem`. `CreditItem` uses a `Card` layout to create the visual presentation of each cast card.
- Key Implementation Details:
  - Uses `Card` and `CardMedia` components to display the cast member’s profile picture and basic information.
  - Provides a default placeholder image in case the `profile_path` is missing from the cast data.
  - Includes default values when the `cast` object is `undefined` or lacks certain properties to prevent errors caused by accessing undefined properties.

##### Code Example

```js
// Using CreditsList in a parent component
<CreditsList credits={creditsData.cast} />
```

#### 3. `CreditsList`  add Sliding Window 

Use the sliding window to show the credits cards in the Movie Detail Page 

##### Feature Description

The sliding window (carousel) component is designed to showcase a curated list of movies on the homepage. Users can easily navigate through the movies by horizontally scrolling or using navigation dots.

##### Implementation Details

- The carousel was implemented using the `react-slick` library.
- Responsive design was added to dynamically adjust the number of visible movie cards based on the screen size.
- Each card displays a movie poster, title, and rating, with a clickable link that navigates to the movie's detail page.

> Main code 

```js
<Slider {...settings}>
        {credits.map((cast, index) => (
          cast ? (
            <Box key={cast.id || index} sx={{ padding: "10px" }}>
              <CreditItem cast={cast} />
            </Box>
          ) : null
        ))}
        {/* The last box ：show “view more ” */}
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:"200px",
            padding: "10px",
          }}
        >
          <Button 
          variant="contained" 
          color="primary"  
          onClick={() => navigate(`/movies/${movie.id}/cast`)}
          >
            View More
          </Button>
        </Box>
      </Slider>
```

#### 4. `ListOfCreditsPage` Component

##### Feature Description

The List of Credits page displays all the actors involved in a movie, allowing users to view detailed information, such as the actor's photo, name, and their role in the movie.

##### Implementation Details

- A grid layout was used to display actor cards in a structured and responsive format.
- Each card shows the actor's image, name, and role in the movie. Clicking on a card navigates to the actor's detail page.
- Images were optimized to maintain a consistent aspect ratio (3:4), and placeholder images were added for missing actor photos.

> Main code 

```js
return (
    <>
      <MovieHeader movie={movie} />
      <div style={{ padding: "15px" }}>
        <Typography variant="h4" gutterBottom>
          Full Cast & Crew
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {credits.map((cast, index) => (
            cast && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cast.id || index}>
                <CreditItem cast={cast} movie={movie} />
              </Grid>
            )
          ))}
        </Grid>
      </div>
    </>
  );
```

#### 5.`CreditMovieCard` Component

##### Feather **Description**

Displays a single movie card, including the poster and title.

##### **Implementation Details**

- Maintains a consistent aspect ratio for movie posters.
- Provides a clickable link for navigating to the movie's detail page.
- Optimized to handle missing data gracefully.

#### 6.`CreditMovieList` Component

##### Feather **Description**:

Displays a horizontally scrollable sliding window of movie cards using the `ImageList` in the mui.

##### **Implementation Details**

- Integrated a carousel for smooth horizontal scrolling.
- Dynamically adjusts the visible number of movie cards based on screen size.
- Each movie card is clickable, taking users to the movie detail page.

```js
        <Typography variant="h4" gutterBottom >
        Known For
        </Typography>
        <ImageList
        sx={{display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            gap: 10,
            padding: "10px 0",}}
            cols={movies.length}
            rowHeight={250}
        >
            {movies.map((movie)=>(
                <ImageListItem key={movie.id} sx={{flex:"0 0 auto "}}>
                    <CreditMovieCard movie={movie}/>
                </ImageListItem>
            ))}
        </ImageList>
```



### Pagination Implement

#### Features

1. **Dynamic Data Fetching**: Fetch paginated data from an API using React Query.
2. **Reusable Pagination Component**: A separate `PaginationComponent` for easy integration across multiple pages.
3. **Material-UI Styled Controls**: Modern and responsive pagination controls with MUI.
4. **Page State Management**: Maintains the current page state for easy navigation between pages.

#### 1. Fetch Data with Pagination

```js
export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

```

- This function takes the `page` parameter and fetches data for the corresponding page from the API.
- React Query is used to handle caching, loading states, and error handling.

#### 2.Create the Reusable `PaginationComponent`

```js
import React from 'react';
import { Pagination, Box, Typography } from '@mui/material';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 4 
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Page: {currentPage}
      </Typography>
      <Pagination
        count={totalPages} // Total number of pages
        page={currentPage} // Current page
        onChange={onPageChange} // Handler for page change
        color="primary"
        shape="rounded"
        variant="outlined"
      />
    </Box>
  );
};

export default PaginationComponent;

```

##### Key Props:

- `currentPage`: The current page number.
- `totalPages`: The total number of pages (e.g., fetched from the API).
- `onPageChange`: Callback function triggered when the user changes the page.

#### 3.Integrate Pagination in a Page

```js
const [page, setPage] = useState(1);

  // Fetch movies with pagination
  const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
    keepPreviousData: true, 
  });
  
  ...
  
  const handlePageChange = (_, value) => {
    setPage(value);
  }; 
  ...
  
  <PaginationComponent
        currentPage={page}
        totalPages={500} // Example: Total pages from API
        onPageChange={handlePageChange}
      />
  
```

##### Key Features:

1. **State Management**:
   - The `page` state keeps track of the current page number.
   - When the user changes the page, `handlePageChange` updates the state.
2. **React Query Integration**:
   - The `useQuery` hook dynamically fetches data for the current page, caching results for faster navigation.
3. **Pagination Display**:
   - The `PaginationComponent` handles the display and navigation for pagination.

#### 4. Usage in Other Pages

```js
<PaginationComponent
  currentPage={currentPage} // State for the current page
  totalPages={totalPages}   // Total number of pages from API
  onPageChange={handlePageChange} // Page change handler
/>

```

