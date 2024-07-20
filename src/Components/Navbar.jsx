// Navbar.js
import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cart from "./Cart";
import * as Popover from "@radix-ui/react-popover";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="text-gray-200 w-full bg-slate-900 h-20 px-4 flex justify-between items-center text-lg">
      <img src="/public/Bharatgologo.png" alt="Logo" />
      <ul className="hidden md:flex items-center font-semibold text-sm">
        <li className="p-5">
          <Link to="/">Home</Link>
        </li>
        <li className="p-5">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="p-5">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex items-center p-0 bg-transparent border-none">
                <AiOutlineShoppingCart size={30} />
              </button>
            </Popover.Trigger>
            <Popover.Content
              side="bottom"
              align="end"
              className="w-full rounded-md shadow-lg"
              style={{zIndex:9999, width: "50rem"}}
            >
              <Cart />
            </Popover.Content>
          </Popover.Root>
        </li>
        <li className="p-5">
          {isLoggedIn ? (
            <Link to="/logout">
              <FiLogOut size={30} />
            </Link>
          ) : (
            <Link to="/login">
              <FiLogIn size={30} />
            </Link>
          )}
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden z-40">
        <motion.div
          key={nav ? "close" : "menu"}
          initial={{ rotate: 0 }}
          animate={{ rotate: nav ? 360 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </motion.div>
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: -50, bottom: 50 }}
          initial={{ x: "-100%" }}
          animate={{ x: nav ? 0 : "-100%" }}
          transition={{ type: "tween", damping: 8 }}
          className="flex justify-center items-center z-40 mt-5 text-gray-300 rounded-tr-full rounded-br-full fixed left-0 h-auto w-auto bg-slate-900"
        >
          <ul className="p-8 text-l text-sm">
            <li className="p-5">
              <Link onClick={closeNav} to="/">
                Home
              </Link>
            </li>
            <li className="p-5">
              <Link onClick={closeNav} to="/shop">
                Shop
              </Link>
            </li>
            <li className="p-5">
            <Link onClick={closeNav} to="/cart">
                <AiOutlineShoppingCart size={20} />
              </Link>
            </li>
            <li className="p-5">
              {isLoggedIn ? (
                <Link onClick={closeNav} to="/logout">
                  <FiLogOut size={20} />
                </Link>
              ) : (
                <Link onClick={closeNav} to="/login">
                  <FiLogIn size={20} />
                </Link>
              )}
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Navbar;
