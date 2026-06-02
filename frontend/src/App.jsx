import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ExploreMore from "./pages/ExploreMore";
import Contact from "./sections/Contact";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import About from "./sections/About";
import ScrollProgress from "./components/ScrollProgress";
import ResumeCms from "./pages/ResumeCms";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
      
      <ScrollProgress />
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreMore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/resume" element={<ResumeCms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
