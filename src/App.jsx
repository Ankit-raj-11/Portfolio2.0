import BGIMG from "./components/png.jsx";
import Navbar from "./components/navbar.jsx";
import SideNav from "./components/sideNav.jsx";
import FluidCursor from "./cursor/smoke.jsx";
import About from "./components/About.jsx";
import INTRO from "./Text/intro.jsx";
import Footer from "./components/footer.jsx";
import Abouttext from "./Text/abouttext.jsx";
import Worktext from "./Text/recentwork.jsx";
import Work from "./components/work.jsx";

// Reusable component for section design indicators
const SectionIndicator = ({ label, number, isOverlay = true }) => (
  <div className={`w-full flex justify-between px-6 md:px-16 font-['Squada_One'] text-[1rem] md:text-[3rem] z-50 pointer-events-none mix-blend-difference text-white ${isOverlay ? 'absolute top-[100px]' : 'pt-[100px] mb-4'
    }`}>
    <div>{label}</div>
    <div>{number}</div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <SideNav />
      <FluidCursor />

      <main>
        {/* 1. HOME SECTION */}
        <section id="home" className="h-screen w-full snap-start relative flex flex-col justify-center overflow-hidden">
          <SectionIndicator label="DSGN/1" number="1/4" />
          <BGIMG />
          <INTRO />
        </section>

        {/* 2. ABOUT TEXT SECTION */}
        <section className="w-full snap-start relative overflow-hidden">
          <Abouttext />
        </section>

        {/* 3. ABOUT CONTENT SECTION */}
        <section id="about-section" className="min-h-screen w-full snap-start relative flex justify-center items-center">
          <SectionIndicator label="DSGN/2" number="2/4" />
          <About />
        </section>


        {/* 4. WORK TEXT SECTION */}
        <section className="w-full snap-start relative flex justify-center items-center overflow-hidden bg-black">
          <Worktext />
        </section>

        {/* 5. PROJECTS SECTION */}
        <section id="projects-section" className="h-screen w-full snap-start relative overflow-hidden bg-black flex flex-col">
          <SectionIndicator label="DSGN/3" number="3/4" isOverlay={false} />

          {/* Work Component takes remaining height */}
          <div className="flex-grow w-full overflow-hidden">
            <Work />
          </div>
        </section>

        {/* 6. CONTACT/FOOTER SECTION */}
        <section id="contacts-section" className="h-screen w-full snap-start relative flex flex-col items-center overflow-hidden bg-black">
          <SectionIndicator label="DSGN/4" number="4/4" isOverlay={false} />
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;
