import img1 from "@assets/p1.png";
import img2 from "@assets/p2.png";
import img3 from "@assets/p3.png";
import img4 from "@assets/p4.png";

import { FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BiLogoGmail } from "react-icons/bi";

export const NAV_ITEMS = [
    { href: "#home", label: "[HOME]" },
    { href: "#about-section", label: "[ABOUT]" },
    { href: "#projects-section", label: "[PROJECTS]" },
    { href: "#contacts-section", label: "[CONTACTS]" },
];

export const SOCIAL_LINKS = [
    {
        href: "https://www.linkedin.com/in/ankit-111-raj",
        Icon: FaLinkedinIn,
        label: "LinkedIn Profile"
    },
    {
        href: "https://github.com/Ankit-raj-11",
        Icon: FiGithub,
        label: "GitHub Profile Ankit raj"
    },
    {
        href: "https://discord.com/users/ankit9199", // User ID needed for direct link, using generic or assuming search
        Icon: FaDiscord,
        label: "Discord"
    },
    {
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=ankit74850raj@gmail.com&su=Inquiry%20from%20Your%20Website&body=Hello%20Ankit%2C%0A%0AI%20am%20writing%20to%20you%20about%20...",
        Icon: BiLogoGmail,
        label: "Compose new Gmail message"
    }
];

export const WORK_PROJECTS = [
    {
        id: 1,
        title: "Project: Apna-college",
        img: img1,
    },
    {
        id: 2,
        title: "Project: Memory game",
        img: img2,
    },
    {
        id: 3,
        title: "Project: Pandu (e-commerce)",
        img: img3,
    },
    {
        id: 4,
        title: "Project: Trace (typing-game)",
        img: img4,
    },
];

export const CONTACT_INFO = {
    email: "ankit74850raj@gmail.com",
    collaborationText: "AVAILABLE FOR COLLABORATION",
    recentWorkText: "RECENT WORK",
    recentWorkTitle: "TRACE",
    recentWorkLink: "https://github.com/Ankit-raj-11/T-race",
    composeEmailLink: "https://mail.google.com/mail/?view=cm&fs=1&to=ankit74850raj@gmail.com&su=Inquiry%20from%20Your%20Website&body=Hello%20Ankit%2C%0A%0AI%20am%20writing%20to%20you%20about%20..."
};
