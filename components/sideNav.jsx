import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BiLogoGmail } from "react-icons/bi";

function SideNav() {
  return (
    <>
      <nav className="side-nav">
        <a
          // 💡 FIX: Added 'https://' to make it an absolute URL
          href="https://www.linkedin.com/in/ankit-111-raj"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedinIn size={38} className="sidenav" />
        </a>

        <a
          href="https://github.com/Ankit-raj-11"
          target="_blank" // Recommended: Opens the link in a new tab
          rel="noopener noreferrer" // Recommended: Security measure for target="_blank"
          aria-label="GitHub Profile Ankit raj" // Recommended: For accessibility
        >
          <FiGithub size={38} className="sidenav" />
        </a>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ankit74850raj@gmail.com&su=Inquiry%20from%20Your%20Website&body=Hello%20Ankit%2C%0A%0AI%20am%20writing%20to%20you%20about%20..."
          target="_blank" // Open in a new tab
          rel="noopener noreferrer"
          aria-label="Compose new Gmail message"
        >
          <BiLogoGmail size={38} className="sidenav" />
        </a>
      </nav>
      <div className="email-container">
        <div className="email-sub">AVAILABLE FOR COLLABORATION </div>
        <div className="email-hover">
          <div className="arrow">&rarr;</div>
          <div className="email">ankit74850raj@gmail.com</div>
        </div>
      </div>
      <div className="email-container2">
        <div className="email-sub2">RECENT WORK</div>
        <div className="email-hover2">
          <div className="arrow2">&rarr;</div>
          <div className="email2">TRACE</div>
        </div>
      </div>
    </>
  );
}
export default SideNav;
