import React, { useContext} from "react";
import { signInWithGoogle, logout } from "../firebase";
import { useNavigate } from "react-router-dom"; // For navigation
import { Card, CardContent, Avatar, Typography, Button, Box } from "@mui/material";
import { MoviesContext } from "../contexts/moviesContext";

const LoginPage = () => {
  const {user,setUser} = useContext(MoviesContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
      navigate("/home"); // Redirect to HomePage after login
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Error during Sign-Out:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ padding: "20px", maxWidth: "400px", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login Page Welcome to the REACT MOVIE WEB
          </Typography>
          {user ? (
            <>
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                sx={{ width: 80, height: 80, margin: "20px auto" }}
              >
                {user.displayName.charAt(0)}
              </Avatar>
              <Typography variant="h6">{`Welcome, ${user.displayName}`}</Typography>
              <Typography variant="body1" color="textSecondary">
                {`Email: ${user.email}`}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginTop: "20px" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
              sx={{ marginTop: "20px" }}
            >
              Sign in with Google
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
