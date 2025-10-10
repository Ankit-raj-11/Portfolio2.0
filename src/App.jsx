import BGIMG from "../components/png";
import Navbar from "../components/navbar";
import SideNav from "../components/sideNav";
import FluidCursor from "../cursor/smoke";
import BoxAnimation from "../components/projects";

import TEXT2 from "../Text/Text2.jsx";
import About from "../components/About.jsx";
import INTRO from "../Text/intro.jsx";
import Footer from "../components/footer";
import FallingPhysicsText from "../Text/fallingtext";
import Abouttext from "../Text/abouttext";
import Worktext from "../Text/recentwork.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SideNav />
      <BGIMG />
      <INTRO />
      <FluidCursor />
      <Abouttext />
      <About />
      <Worktext />
      <Footer />
    </div>
  );
}

export default App;
