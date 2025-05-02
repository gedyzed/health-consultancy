import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/home_page/icons/Logo.svg"
import Home from '../../pages/homepage/subpages/Home';

const Navbar = () => {
    return (

        <div className="navbar flex justify-between px-5 shadow-md text-[#023E8A] font-bold">
            <div>
                <img src={logo} alt="" />
            </div>
            <div className="flex gap-x-25 justify-evenly items-center pr-10 text-sm md:text-md">
                <Link to="/" className='btn btn-ghost font-bold'>Home</Link>
                <Link to="/services" className='btn btn-ghost font-bold'>Services</Link>
                <Link to="/contact" className='btn btn-ghost font-bold'>Contact Us</Link>
                <div>
                <Link to="/login">
                    <div className="btn btn-outline text-sm md:text-md font-bold mx-3">
                            Login
                    </div>
                </Link>

                <Link to="/register">
                    <div className="btn btn-outline text-sm md:text-md font-bold">
                            Register
                    </div>
                </Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar;
