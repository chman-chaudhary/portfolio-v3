import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Build from "./Pages/Build";
import Contact from "./Pages/Contact";
import WorkAndSkill from "./Pages/WorkAndSkill";
import UnderConstruction from "./Pages/UnderConstruction";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-[#f5f5f5] text-[#1a1a1a] scroll-smooth">
              <Hero />
              <About />
              <Build />
              <WorkAndSkill />
              <Contact />
            </div>
          }
        />
        <Route path="/under-construction" element={<UnderConstruction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
