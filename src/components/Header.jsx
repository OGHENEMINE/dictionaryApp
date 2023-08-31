import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <header className="grid grid-cols-1 items-center lg:grid-cols-2 tracking-wide lg:justify-between md:pb-3 lg:pt-14 px-6 lg:px-28 bg-purple-50 relative">
      <div
        data-aos="fade-down"
        data-aos-easing="ease-in"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="z-20 mt-20 lg:mt-0"
      >
        <h1 className="lg:leading-8 md:text-xl text-center lg:text-start font-bold text-pink-700 tracking-widest mb-5">
          <span className="capitalize text-3xl md:text-5xl font-vollkorn">
            Discover new words, Bookmark words,
          </span>{" "}
          and{" "}
          <span className="capitalize text-3xl md:text-5xl font-vollkorn">
            Improve your grammar
          </span>{" "}
          with word-finder.
        </h1>
        <Link
          to="/wordsearch"
          className="py-6 px-3 w-60 mx-auto lg:mx-0 flex items-center justify-center gap-3 rounded-full border border-pink-700 hover:border-orange-600 hover:bg-orange-600 tracking-widest text-pink-700 font-bold hover:text-white uppercase cursor-pointer relative transition-all duration-500"
        >
          get started
          <FontAwesomeIcon
            className="animate-pulse"
            icon={faArrowAltCircleRight}
          />
        </Link>
      </div>

      <img
        src="/Dictionary-amico.svg"
        className="z-20"
        alt="a girl reading a dictionary"
      />

      <div  data-aos="fade-down"
            data-aos-easing="ease-in"
            data-aos-duration="500" className="bg-gradient-to-tr from-purple-100 to-purple-900 absolute top-0 right-0 h-full clip_style w-full"></div>
    </header>
  );
}

export default Header;
