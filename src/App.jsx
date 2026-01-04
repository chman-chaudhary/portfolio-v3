import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Build from "./Pages/Build";
import Contact from "./Pages/Contact";
import WorkAndSkill from "./Pages/WorkAndSkill";

function App() {
  return (
    <div className="bg-[#f5f5f5] text-[#1a1a1a] scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Build />
      <WorkAndSkill />
      <Contact />
    </div>
  );
}

export default App;
