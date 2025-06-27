// src/routes.tsx
import { Route, Routes } from "react-router-dom";
import Shortener from "./pages/Shortener";
import Statistics from "./pages/Statistics";
import RedirectPage from "./pages/RedirectPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shortener />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
};

export default AppRoutes;
