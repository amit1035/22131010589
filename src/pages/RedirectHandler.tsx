import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Log } from "../utils/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const fetchRedirect = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resolve/${shortcode}`);
        const data = await res.json();
        await Log("frontend", "info", "page", `Redirecting: ${shortcode}`);
        window.location.href = data.originalUrl;
      } catch (err) {
        await Log("frontend", "error", "page", "Redirect failed");
        alert("URL not found or expired");
      }
    };
    fetchRedirect();
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
