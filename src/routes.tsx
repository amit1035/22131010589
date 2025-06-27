import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import Statistics from "./pages/Statistics";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UrlForm />} />
      <Route path="/stats" element={<Statistics />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
