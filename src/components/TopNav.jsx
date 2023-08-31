import { faBars, faCancel, faL, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollY } from "../hooks/useScrollY";
import MobileNav from "./MobileNav";

function TopNav() {
  const [toggle, setToggle] = useState(false);
  const y = useScrollY();

  const handleToggle = () => {
    setToggle(!toggle)
  }

  // const x = y / 100
  // console.log(x)

  return (
    <>
      <nav
      className={classNames(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 lg:px-28 py-5",
        {
          "bg-white text-purple-900 shadow": y >= 200 && toggle == false,
          "text-purple-900": toggle === true,
          "text-white": y < 200 && toggle == false
        }
      )}
    >
      <NavLink to='/'>Word-finder</NavLink>

      <div className="hidden md:flex items-center justify-between gap-16 lg:gap-28 uppercase text-xs tracking-widest font-bold transition-all ease-in-out duration-300">
        {["home", "wordsearch", "bookmark"].map((item) => (
          y < 250 ? (
            <NavLink
            key={item}
            to={item !== 'home'? `/${item}` : '/'}
            className={({ isActive }) =>
              isActive
                ? "bg-white py-2 px-3 text-purple-900 rounded-full"
                : "py-2 px-3 hover:rounded-full hover:bg-white hover:text-purple-900"
            }
          >
            {item}
          </NavLink>
          ): (
            <NavLink
            key={item}
            to={item !== 'home'? `/${item}` : '/'}
            className={({ isActive }) =>
              isActive
                ? "bg-purple-900 py-2 px-3 text-white rounded-full"
                : "py-2 px-3 hover:rounded-full hover:bg-purple-200"
            }
          >
            {item}
          </NavLink>
          )
        ))}
      </div>

      <button onClick={handleToggle} className="md:hidden relative rounded-md transition-all duration-500 ease-in-out hover:bg-purple-200 px-2 py-1 shadow hover:text-purple-900 flex justify-center flex-col gap-1">
        <FontAwesomeIcon className={`w-full h-6 transition-all duration-500 ease-in-out ${toggle? 'hidden': ''}`} icon={faBars}/>
        <FontAwesomeIcon className={`w-full h-6 transition-all duration-500 ease-in-out ${toggle? '': 'hidden'}`} icon={faX}/>
      </button>

      <div className={classNames("absolute bottom-0 left-0 bg-blue-900 h-2",{

      })}></div>
    </nav>

    <MobileNav toggle={toggle} handleToggle={handleToggle}/>
    </>
  );
}

export default TopNav;
