import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Build from "./Pages/Build";
import Contact from "./Pages/Contact";
import WorkAndSkill from "./Pages/WorkAndSkill";

function App() {
  return (
    <div className="bg-[#f9f9f9]">
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
