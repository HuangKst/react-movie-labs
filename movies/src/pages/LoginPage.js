import React, { useContext} from "react";
import { signInWithGoogle, logout } from "../firebase";
import { useNavigate } from "react-router-dom"; // For navigation
import {  Avatar, Typography, Button, Box } from "@mui/material";
import { MoviesContext } from "../contexts/moviesContext";
import backgroundImage from "../images/login-page.jpg"
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
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // 半透明背景
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
          maxWidth: "500px",
          width: "90%", // 适应小屏幕
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          Welcome to React Movie Web
        </Typography>
        {user ? (
          <>
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              sx={{
                width: 120,
                height: 120,
                margin: "20px",
                border: "3px solid #fff",
              }}
            >
              {user.displayName.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>{`Hello, ${user.displayName}`}</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: "20px" }}>
              {`Email: ${user.email}`}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#f44336",
                "&:hover": { backgroundColor: "#d32f2f" },
                padding: "10px 20px",
                fontSize: "16px",
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: "#1e88e5",
              "&:hover": { backgroundColor: "#1565c0" },
              padding: "15px 30px",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            Sign in with Google
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
