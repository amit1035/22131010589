// src/pages/Shortener.tsx
import { Container, Typography } from "@mui/material";
import UrlForm from "../components/UrlForm";
import { useEffect } from "react";
import { Log } from "../utils/logger";

const Shortener = () => {
  useEffect(() => {
    Log("frontend", "info", "page", "Visited Shortener Page");
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" marginTop={4}>
        React URL Shortener
      </Typography>
      <UrlForm />
    </Container>
  );
};

export default Shortener;
