import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BiLogoGmail } from "react-icons/bi";

function SideNav() {
  return (
    <>
      <nav className="side-nav">
        <FaInstagram size={38} className="sidenav" />
        <FiGithub size={38} className="sidenav" />
        <BiLogoGmail size={38} className="sidenav" />
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
          <div className="email2">
              TRACE
          </div>
        </div>
      </div>
    </>
  );
}
export default SideNav;
