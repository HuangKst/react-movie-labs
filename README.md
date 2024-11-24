# Assignment 1 - ReactJS app.

Name: Zihan Huang

## Overview.

A React web application where a user can browse through movies, integrated with TMDB API making it rich in features and seamless. User authentication may be needed to use the application features.

After users are signed in, they are able to explore many features focused on their movie discovery journey. The site allows users to view new releases movies with a list of the latest films available. Users can even filter out films based on their rating, which makes it a quick and simple way to find the top rated movies according to your preference.
It is a perfect movie app template built using React and TMDB API, this simple web application can be further extended to bring powerful features with the latest web development techniques for a seamless user experience. With a focus on maintaining a safe environment for users, the platform is designed to address the various needs of movie enthusiasts, from browsing newly released films through users created watchlists.

### Features.
+ Top Rate Page
+ Credits Page
+ List of Credits Page
+ Watch List Page
+ Login Page(firebase)
+ Credits Page
+ tmdb-api（`getTopRateMovies`，`getMovieReviews`，`getMovieCredits`，`getCreditDetails`，`getCreditMovies`）
+ cardIcons（`removeFromWatchList`）
+ CreditDetail
+ creditMovieCard
+ creditsMovieList
+ creditsSidebar
+ credits
+ credits List
+ filterMovieCard（Data sort，Rate sort）
+ headerCredits（Add the `topRate`,`userImage`）
+ pagination
+ movieContexts(Add `playList`,`user`)
+ image(Login image )
+ firebase
+ index(Add many routes)

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

`npm run build`

`npm install @mui/material`

`npm install firebase`

`npm start`

Configure .env file

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

## API endpoints.

- **Top Rated Movies** - `/movie/top_rated`: Fetches a list of top-rated movies, optionally paginated by page number.
- **Movie Details** - `/movie/:id`: Retrieves detailed information about a specific movie using its ID.
- **Movie Genres** - `/genre/movie/list`: Fetches a list of available movie genres.
- **Movie Images** - `/movie/:id/images`: Retrieves images related to a specific movie using its ID.
- **Movie Reviews** - `/movie/:id/reviews`: Fetches reviews of a specific movie using its ID.
- **Movie Credits** - `/movie/:id/credits`: Retrieves cast and crew information for a specific movie using its ID.
- **Credit Details** - `/person/:id`: Fetches detailed information about a person (actor, director, etc.) using their ID.
- **Credit Movies** - `/person/:id/combined_credits`: Retrieves all movies and TV shows a person has worked on using their ID.
- **Discover Movies with Pagination** - `/discover/movie`: Retrieves a list of movies with an additional `page` parameter added to enable pagination for fetching movies across multiple pages.

## Routing.

- **/** - Displays the login page (public route).
- **/home** - Displays the homepage (protected route, requires authentication).
- **/movies/favorites** - Displays the user's list of favorite movies (protected route).
- **/movies/:id** - Displays details of a specific movie (protected route).
- **/movies/upcoming** - Displays a list of upcoming movies (protected route).
- **/movies/top_rate** - Displays a list of top-rated movies (protected route).
- **/movies/:id/cast** - Displays the cast of a specific movie (protected route).
- **/movies/watchList** - Displays the user's watchlist of movies (protected route).
- **/reviews/:id** - Displays a specific movie's review (protected route).
- **/reviews/form** - Displays the form for adding a new movie review (protected route).
- **/credits/:id** - Displays the credits of a specific person (protected route).
- ***** - Redirects to the login page for any undefined route (public fallback).

### Protection Details:

- **Public Routes:** `/` (login page).
- **Protected Routes:** All other routes require authentication to access.

## Independent learning (If relevant).

### Technologies/Techniques Researched Independently:

1. Firebase Integration:
   - Learned how to integrate Firebase into a React project for user authentication.
   - Implemented Firebase configuration securely using environment variables (`process.env`).
   - Utilized Firebase Authentication services, including `GoogleAuthProvider` for Google sign-in and `signOut` for logout functionality.

#### Relevant Source Code Files:

- `firebase.js`:
  - Contains Firebase initialization, configuration, and authentication functions.
  - Includes `signInWithGoogle` for Google authentication and `logout` for user sign-out.

#### Online Resources Used:

1. **Firebase Documentation:**
   - https://firebase.google.cn/docs/web/setup?hl=zh-cn
   - https://firebase.google.cn/docs/auth/web/start?hl=zh-cn
   - https://firebase.google.cn/docs/web/setup?hl=zh-cn
2. **YouTube Tutorials:**
   - [Google Firebase Authentication Tutorial for Beginners](https://www.youtube.com/watch?v=9kRgVxULbag)

### **Technologies/Techniques Researched and Adopted**

#### 1. **MUI Grid System**

- Purpose:
  - Structured responsive layouts, particularly for the actor's biography and movie sections.
  - Helped organize content into a 2-column layout.
- Key Techniques:
  - `Grid container` and `Grid item` for spacing and alignment.
  - Using breakpoints like `xs`, `sm`, and `md` for responsive behavior.

#### 2. **MUI Typography**

- Purpose:
  - Used for text styling throughout the project (e.g., actor's name, movie titles, section headings).
- Key Techniques:
  - Implemented variants such as `h4`, `body1`, and `subtitle1` for semantic structure.
  - Customized text styles using `sx` (e.g., `fontWeight`, `textOverflow`, `whiteSpace`).

#### 3. **MUI Box**

- Purpose:
  - Used for lightweight layout and alignment.
- Key Techniques:
  - Applied `sx` for styling (e.g., `padding`, `margin`, `flexbox` alignment).
  - Frequently used in `CreditMovieList` and `CreditMovieCard`.

#### 4. **MUI ImageList and ImageListItem**

- Purpose:
  - Prototyped a horizontally scrollable movie list using `ImageList`.
  - Later replaced by `react-slick` but retained for initial grid prototyping.

#### 5. **MUI Avatar**

- Purpose:
  - Displayed the actor's profile image with consistent styling.
- Key Techniques:
  - Customized avatar dimensions using the `sx` prop.

#### 6. **MUI Card**

- Purpose:
  - Used for encapsulating movie details in a structured format.
- Key Techniques:
  - Combined with `CardContent` for clean and organized layouts.
  - Styled with shadows, borders, and rounded corners for enhanced UI.

#### 7. **MUI Customization**

- Purpose:
  - Tailored Material-UI components to meet specific project design needs.
- Key Techniques:
  - Overrode default styles using the `sx` prop for Typography and Box components.
  - Used theming to maintain consistent color and spacing across the application.

------

### **Key Components in Source Code**

#### **1. CreditMovieCard.js**

- **Purpose**: Displays a single movie card with the poster and title.
- Highlights:
  - Used `Box` for layout and alignment.
  - Styled the poster with consistent dimensions and rounded corners.
- **File Reference**: `src/components/CreditMovieCard.js`.

#### **2. CreditMovieList.js**

- **Purpose**: Displays a horizontally scrollable movie list using `react-slick`.
- Highlights:
  - Implemented a carousel for a dynamic, interactive movie list.
  - Applied responsive design to adjust the number of visible movies based on screen size.
- **File Reference**: `src/components/CreditMovieList.js`.

#### **3. CreditsPage.js**

- **Purpose**: Combines all the components into a cohesive page layout.
- Highlights:
  - Used the `Grid` system to organize the actor's biography and movie sections.
  - Dynamically fetched and displayed data using `React Query`.
- **File Reference**: `src/pages/CreditsPage.js`.

------

### **Key Learning Resources**

1. **Material-UI Documentation**:
   - Comprehensive reference for MUI components, theming, and customization.
   - Link: https://mui.com/
2. **React Query Documentation**:
   - Helped in integrating efficient data fetching and caching in the project.
   - Link: https://tanstack.com/query/v4/docs
3. **React-Slick Documentation**:
   - Essential for implementing the sliding window in the movie list.
   - Link: https://react-slick.neostack.com/
4. **CSS Tricks: Flexbox Guide**:
   - Useful for understanding flexbox properties used in `Box` components.
   - Link: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
   - 

Worked individually to research and incorporate features for added functionality of a usable, aesthetic & responsive web-app Firebase was added to the project for authentication but implemented in secure ways like using environment variable and Google login. This research helped get familiar with key concepts of Firebase such as authentication, configuration and efficient use firebase to simple login/logout.

Moreover, Material-UI (MUI) has also been implemented to use as a core library for creating responsive layouts and improving UI. Some utilized techniques such as making use of MUI's Grid for layout management, Typography for semantically styling texts, and Card components to represent movie information allowed me to keep a modern & clean design. Consistency throughout the application was guaranteed due to customizations with sx prop and theming

Research was also done around other tools such as React query for data fetching and caching, React-slick for dynamic carouse and CSS Flexbox for favorable lightweight layout solution that would become a part of the project. Together, these techniques provided significant improvement to the interactivity, performance, and usability of the app.

The resulting independent learning not only strengthened technical knowledge, but also provided evidence to amplify the app functionality and user experience leading to a strong, responsive, feature-rich application.