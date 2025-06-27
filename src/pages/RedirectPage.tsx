// src/pages/RedirectPage.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Log } from "../utils/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/redirect/${shortcode}`);
        const data = await res.json();

        if (!res.ok || !data.originalUrl) {
          await Log("frontend", "error", "page", "Invalid or expired shortcode");
          navigate("/"); // Redirect to home on error
          return;
        }

        await Log("frontend", "info", "page", `Redirecting to ${data.originalUrl}`);
        window.location.href = data.originalUrl;
      } catch (error: any) {
        await Log("frontend", "fatal", "page", error.message);
        navigate("/");
      }
    };

    if (shortcode) {
      fetchAndRedirect();
    }
  }, [shortcode, navigate]);

  return null; 
};

export default RedirectPage;
