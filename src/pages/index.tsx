// src/pages/index.tsx
import { Container, Typography, Button, Paper } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import FundMe from "../components/FundMe";

const Home: NextPage = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] =
    useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check for MetaMask installation only on the client side
    setIsMetaMaskInstalled(typeof window.ethereum !== "undefined");
    // Check if already connected
    if (window.ethereum?.selectedAddress) {
      setIsConnected(true);
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsConnected(true);
    } catch (error) {
      console.error("User rejected the request:", error);
    }
  };

  const renderContent = () => {
    if (!isMetaMaskInstalled) {
      return (
        <Typography variant="body1" sx={{ marginBottom: 3, color: "red" }}>
          Please install MetaMask to continue.
        </Typography>
      );
    }

    if (isConnected) {
      return (
        <>
          <Typography
            variant="body1"
            sx={{ marginBottom: 3, color: "#007bff" }}
          >
            Connected to MetaMask!!!
          </Typography>
          <FundMe
            isMetaMaskConnected={isConnected}
          />
        </>
      );
    }

    return (
      <Button
        variant="contained"
        color={"primary"}
        size="large"
        sx={{
          padding: "12px 24px",
          textTransform: "none",
          backgroundColor: "#007bff", // Modern blue colors
          "&:hover": {
            backgroundColor: "#0056b3", // Hover colors
          },
        }}
        onClick={connectMetaMask}
      >
        Connect MetaMask
      </Button>
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3,
        textAlign: "center",
        backgroundColor: "#121212", // Darker background
        color: "#e0e0e0", // Light text color
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#1e1e1e", // Slightly lighter dark background
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: 2, color: "#f5f5f5" }}>
          Fund Me
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3, color: "#b0b0b0" }}>
          Your journey to secure funding starts here.
        </Typography>
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default Home;
