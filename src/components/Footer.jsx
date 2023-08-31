import { faChain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="sticky top-[100vh] tracking-widest left-0 right-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-1 bg-purple-900 text-white pb-2 pt-5 px-10 lg:px-24 mt-20">
      <div className="mb-5 md:mb-0">
      <Link to='/' className="uppercase block w-full md:w-fit text-center md:text-start text-xs mb-1 text-white group hover:rounded-full transition-all relative duration-300 ease-in-out">get started
      <FontAwesomeIcon className="w-4 h-4 text-white transition-all duration-300 ease-in-out absolute invisible group-hover:visible -top-1 -right-5" icon={faChain}/></Link>
        {[
          { text: "word search", path: "/wordsearch" },
          { text: "bookmark", path: "/bookmark" },
        ].map(({ text, path }, index) => (
          <Link to={path} key={index} className="relative uppercase block w-full md:w-fit text-center md:text-start text-xs mb-1 group text-white hover:rounded-full transition-all duration-500 ease-in-out">
            {text}
            <FontAwesomeIcon className="w-4 h-4 text-white transition-all duration-300 ease-in-out absolute invisible group-hover:visible -top-1 -right-5" icon={faChain}/>
          </Link>
          
        ))}
      </div>
      <div></div>
      <p className="col-span-2 text-center mt-1 text-xs">Copyright &#169; word-finder 2023. All right reserved.</p>
    </footer>
  );
}

export default Footer;
