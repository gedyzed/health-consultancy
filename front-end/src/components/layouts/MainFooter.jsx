import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-5 bg-[#2A6F97] text-white">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 w-full">
        
        <aside className="flex flex-col gap-2">
          <div className="w-full">
            <img src="src/assets/home_page/icons/Logo.svg" alt="logo" className="w-full" />
          </div>

          <div className="flex gap-4">
            <a href="#">
              <div className="rounded-full p-2 bg-white text-[#2A6F97]">
                <FaInstagram size={20} />
              </div>
            </a>
            <a href="#">
              <div className="rounded-full p-2 bg-white text-[#2A6F97]">
                <FaYoutube size={20} />
              </div>
            </a>
            <a href="#">
              <div className="rounded-full p-2 bg-white text-[#2A6F97]">
                <FaTelegramPlane size={20} />
              </div>
            </a>
            <a href="#">
              <div className="rounded-full p-2 bg-white text-[#2A6F97]">
                <FaTwitter size={20} />
              </div>
            </a>
          </div>

          <p className="text-md">Health Made Simple.</p>
        </aside>

        <nav className="flex flex-col gap-2 ">
          <h6 className="text-lg font-semibold">Resources</h6>
          <Link className="link link-hover">Terms of Service</Link>
          <Link className="link link-hover">Privacy Policy</Link>
        </nav>

     
        <nav className="flex flex-col gap-2">
          <h6 className="text-lg font-semibold">Company Info</h6>
          <Link className="link link-hover">Company Mission</Link>
          <Link className="link link-hover">Company Objective</Link>
        </nav>

    
        <nav className="flex flex-col gap-2">
          <h6 className="text-lg font-semibold">Address</h6>
          <Link className="link link-hover">+251 977 072 089</Link>
          <Link className="link link-hover">
            2972 Westheimer Rd. Santa Ana, Illinois 85486
          </Link>
        </nav>
      </div>

     
      <div className="mt-10 border-t border-white pt-4 text-center text-sm">
        © 2025 Health Consultancy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
