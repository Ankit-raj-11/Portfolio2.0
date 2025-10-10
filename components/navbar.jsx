import { MdHome } from "react-icons/md";
import "./navbar.css";
import { LuSwords } from "react-icons/lu";
import { MdContacts } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
function Navbar() {
return (
    <>
        <nav className="main-nav">
            <MdHome size={42} className="navbar" />
            <LuSwords size={38} className="navbar" />
            <MdContacts size={38} className="navbar" />
            <IoMdDocument size={38} className="navbar" />
            <FaMessage size={36} className="navbar" />
        </nav>
    </>
);
}

export default Navbar;
