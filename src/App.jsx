import BGIMG from "../components/png";
import Navbar from "../components/navbar";
import SideNav from "../components/sideNav";
import FluidCursor from "../cursor/smoke";
import About from "../components/About.jsx";
import INTRO from "../Text/intro.jsx";
import Footer from "../components/footer";
import Abouttext from "../Text/abouttext";
import Worktext from "../Text/recentwork.jsx";
import Work from "../components/work.jsx";

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
      <Work />
      <Footer />
    </div>
  );
}

export default App;
