# react-movie-labs

Youtube DEMO:



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



### After that you need to run below code 

`npm install @mui/material`

`npm install firebase`



### Configure env file

```
REACT_APP_TMDB_KEY=
FAST_REFRESH=

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=r
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=

```



## The main steps to create the web

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

### Add the watch list page

#### 1. Modify the `MoviesContxt`

- Initialize the statement of the `playList`

  ```js
  const [playList, setPlayList] = useState([]);
  ```

- Add the `addMovieToPlayList`:add the movies to the WatchList

  ```js
  const addMovieToPlayList = (movie) => {
    let newPlayList = [];
    if (!playList.includes(movie.id)) {
      newPlayList = [...playList, movie.id];
    } else {
      newPlayList = [...playList];
    }
    setPlayList(newPlayList);
  };
  
  ```

- Add the  `removeFromWatchList` :remove the movies from the WatchList

  ```js
  const removeFromWatchList = (movie) => {
    setPlayList(playList.filter((mId) => mId !== movie.id));
  };
  
  ```

- Export the function 

  ```js
  <MoviesContext.Provider
    value={{
      playList,
      addMovieToPlayList,
      removeFromWatchList,
      // others
    }}
  >
    {props.children}
  </MoviesContext.Provider>
  
  ```

#### Create the `WatchListPage`

- **Access Watchlist data using `MoviesContext`:** Use `useContext` to access the `playList` state from `MoviesContext`.

  ```js
  const { playList: movieIds } = useContext(MoviesContext);
  ```

- **Fetch movie details using `react-query`:** Use `react-query` to fetch details for each movie ID in the `playList`.

  ```js
  const watchListQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  ```

- **Handle loading state:** Check if any query is still loading, and display a loading spinner.

  ```js
  const isLoading = watchListQueries.find((m) => m.isLoading === true);
  if (isLoading) {
    return <Spinner />;
  }
  
  ```

- **Transform movie data:** Convert the `genres` data to `genre_ids` to match the required format for other components.

  ```js
  const movies = watchListQueries
    .filter((q) => q.data)
    .map((q) => {
      q.data.genre_ids = q.data.genres.map((g) => g.id);
      return q.data;
    });
  
  ```

- **Render the page:** Use `PageTemplate` to display movies and add action buttons (e.g., remove from Watchlist).

  ```js
  return (
    <PageTemplate
      title="Watchlist Movies"
      movies={movies}
      action={(movie) => {
        return <RemoveFromWatchListIcon movie={movie} />;
      }}
    />
  );
  
  ```

#### Update `MovieCard` to Show Watchlist Icon

- **Check Watchlist state:** In `MovieCard`, check if the current movie is in the `playList`.

  ```js
  const isInWatchList = playList.includes(movie.id);
  
  ```

- **Display Watchlist icon:** Dynamically show an icon (a bookmark) based on the movie's Watchlist status.

  ```js
  <IconButton onClick={handleToggleWatchList}>
    {isInWatchList ? (
      <BookmarkIcon color="primary" />
    ) : (
      <BookmarkBorderIcon />
    )}
  </IconButton>
  
  ```

- **Add toggle logic:** When the icon is clicked, add or remove the movie from the Watchlist.

  ```js
  const handleToggleWatchList = (e) => {
    e.preventDefault();
    if (isInWatchList) {
      removeFromWatchList(movie);
    } else {
      addMovieToPlayList(movie);
    }
  };
  
  ```


### Add the filter card

#### 1. Add the data release

- **Add `fromDate` and `toDate` inputs:** Use `TextField` components to create date pickers for the "From Date" and "To Date" filters.

```js
<Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
  Filter by Release Date:
</Typography>
<TextField
  sx={{ ...formControl }}
  id="from-date"
  label="From"
  type="date"
  InputLabelProps={{ shrink: true }}
  onChange={(e) => handleDateChange(e, "fromDate")}
/>
<TextField
  sx={{ ...formControl }}
  id="to-date"
  label="To"
  type="date"
  InputLabelProps={{ shrink: true }}
  onChange={(e) => handleDateChange(e, "toDate")}
/>

```

- **Pass the selected dates to the parent component:** Add event handlers for the date inputs to send the selected dates (`fromDate` and `toDate`) to the parent using `onUserInput`.

  ```js
  const handleDateChange = (e, type) => {
    handleChange(e, type, e.target.value);
  };
  
  ```

- #### Update the `MovieListPageTemplate` Component

  - **Add `fromDate` and `toDate` states:** Manage the state for the release date range in the parent component.

    ```
    js复制代码const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    ```

  - **Modify the filtering logic:** Add a condition to filter movies by release date. Check if the movie's release date falls within the selected range.

    ```js
    js复制代码let displayedMovies = movies
      .filter((m) => {
        return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      })
      .filter((m) => {
        return genreId > 0 ? m.genre_ids.includes(genreId) : true;
      })
      .filter((m) => {
        const releaseDate = new Date(m.release_date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (
          (!from || releaseDate >= from) &&
          (!to || releaseDate <= to)
        );
      });
    ```

  - **Handle date changes:** Update `fromDate` and `toDate` states based on user input.

    ```js
    const handleChange = (type, value) => {
      if (type === "name") setNameFilter(value);
      else if (type === "genre") setGenreFilter(value);
      else if (type === "fromDate") setFromDate(value);
      else if (type === "toDate") setToDate(value);
    };
    ```

#### 2 . Add the rate sort 

**Add In the `TemplateMovieListPage`**

```
const [rateOrder, setRateOrder] = useState("asc");

.sort((a, b) => {
    if (rateOrder === "asc") return a.vote_average - b.vote_average;
    else return b.vote_average - a.vote_average;
  });
  
const handleChange = (type, value) => {
   ...
    else if (type === "rateOrder") setRateOrder(value);;
  };
  
<FilterCard
            ...
            rateOrder={rateOrder}
          />
```

**Add in the `FilterMovieCard`**

```js
const handleRateChange=(e,type)=>{
    handleChange(e,"rateOrder",e.target.value);
  }

...

<Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
          Sort by Rating:
        </Typography>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="rate-label">Rate</InputLabel>
          <Select
            labelId="rate-label"
            id="rate-select"
            value={props.rateOrder}
            onChange={handleRateChange}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
```





### Add the Login Page use the firebase

#### 1.Initialize the firebase

We need to install firebase in our react app

```bash
npm install firebase
```

-  Import the Firebase modules you need

  ```js
  import { initializeApp } from "firebase/app";
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
  ```

- web app's Firebase configuration

  ```js
  const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  ```

- Initialize Firebase

  ```js
  const app = initializeApp(firebaseConfig);
  ```

- Initialize Firebase Authentication

  ```js
  export const auth = getAuth(app);
  ```

- Google Auth Provider

  ```js
  export const googleProvider = new GoogleAuthProvider();
  ```

- Function to handle Google Sign-In

  ```js
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // Get signed-in user's information
      console.log("User Info:", user);
      return user;
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      throw error;
    }
  };
  ```

- Function to handle Sign-Out

  ```js
  export const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error during Sign-Out:", error);
    }
  };
  ```

#### 2. set the gobal value in the `moviesContext`

```js
const [user, setUser] = useState(null);

return (
    <MoviesContext.Provider
      value={{
       .....
        user,
        setUser
       
      }}
```

#### 3. Create the login page 

- The function allows users to log in to the application using their Google account.

- Once the user successfully logs in, it updates the application state with the user’s information and navigates to the "Home" page.

  ```js
  const handleGoogleLogin = async () => {
      try {
        const loggedInUser = await signInWithGoogle();
        setUser(loggedInUser);
        navigate("/home"); // Redirect to HomePage after login
      } catch (error) {
        console.error("Error during Google Sign-In:", error);
      }
    };
  ```

- The function allows the user to log out of the application.

- It clears the user's authentication session and updates the application state to reflect that no user is currently logged in.

  ```js
  const handleLogout = async () => {
      try {
        await logout();
        setUser(null);
      } catch (error) {
        console.error("Error during Sign-Out:", error);
      }
    };
  ```

#### 4.Add the user icon in the siteHeader 

```
const handleAvatarClick = () => {
    navigate("/login"); // jump to the login page 
  };
....

{user && (
            <IconButton onClick={handleAvatarClick}>
              <Avatar src={user.photoURL} alt={user.displayName}>
                {user.displayName.charAt(0)}
              </Avatar>
            </IconButton>
          )}
```

#### 5. Update the `index.js` 

In order to show the login page without the siterheader 

```js
const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // check the current location 

  return (
    <>
      {!isLoginPage && <SiteHeader />} {/* if not login page show SiteHeader */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
        <Route path="/movies/upcoming" element={<UpcomingPage />} />
        <Route path="/movies/top_rate" element={<TopRatePage />} />
        <Route path="/credits/:id" element={<CreditsPage />} />
        <Route path="/movies/:id/cast" element={<ListOfCreditsPage />} />
        <Route path="/movies/watchList" element={<WatchListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <Layout /> {/* put Layout into BrowserRouter inside */}
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
```

