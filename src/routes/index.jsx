import { Routes, Route, BrowserRouter } from "react-router-dom";

// Page components
import LandingPage from "../pages/LandingPage";
import { SearchPage } from "../pages/SearchPage";
import LayoutPage from "../pages/LayoutPage";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          {/* Home page */}
          <Route index path="/" element={<LandingPage />} />

          {/* Search page accessible from both URLs */}
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
