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

