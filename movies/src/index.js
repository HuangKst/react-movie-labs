import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes,useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from "./pages/upcomingPage";
import TopRatePage from "./pages/topRatePage";
import CreditsPage from "./pages/creditsPage";
import ListOfCreditsPage from "./pages/listOfCreditsPage";
import WatchListPage from "./pages/watchListPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // 检查当前路径是否为登录页

  return (
    <>
      {!isLoginPage && <SiteHeader />} {/* 非登录页显示 SiteHeader */}
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
          <Layout /> {/* 将 Layout 放在 BrowserRouter 内部 */}
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);