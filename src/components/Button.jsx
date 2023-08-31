import {
  faSearch,
  faStar as faBookMarked,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faUnBookMarked } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";

function Button({
  type,
  isBookMark,
  audioId,
  src,
  phonetics,
  ...rest
}) {
  const [playMode, setPlayMode] = useState(false);

  // FUNCTION FOR MAKING AUDIO PLAY
  const handleAudioPlay = () => {
    const audio = document.querySelector("#myaudio");

    if (playMode === false) {
      setPlayMode(true); // Start playback
      audio.play();
    } else {
      setPlayMode(false); // Pause playback
      audio.pause();
    }
  };

  console.log(phonetics)

  useEffect(() => {
    const audio = document.querySelector("#myaudio");

    if (audio) {
      audio.addEventListener("ended", () => {
        setPlayMode(false); // Update playMode state when audio ends
      });

      return () => {
        audio.removeEventListener("ended", () => {
          setPlayMode(false);
        });
      };
    }
  }, []);

  if (type === "search") {
    return (
      <>
        <button className="bg-purple-900 hover:bg-purple-800 px-4 py-3 tracking-widest text-white flex text-sm items-center justify-center gap-2 border-transparent outline-none">
          search
          <FontAwesomeIcon className="text-sm" icon={faSearch} />
        </button>
      </>
    );
  }

  if (type === "bookmark") {
    return (
      <>
        <button
          className="flex items-center justify-center rounded-full hover:bg-gray-100 hover:shadow-md p-3"
          {...rest}
        >
          <FontAwesomeIcon
            className={classNames("text-2xl", {
              "text-yellow-400": isBookMark,
            })}
            icon={isBookMark ? faBookMarked : faUnBookMarked}
          />
        </button>
      </>
    );
  }

  if (type === "audio") {
    return (
      <>
        <audio id="myaudio" src={src} ></audio>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAudioPlay}
            className="cursor-pointer rounded-full py-2 px-3.5 bg-fuchsia-100 "
            id="audio-control"
            aria-label="audio control"
          >
            <FontAwesomeIcon
              className="text-fuchsia-900"
              icon={playMode ? faPause : faPlay}
            />
          </button>
          <p>{phonetics}</p>
        </div>
      </>
    );
  }

  if (type === "bookmark_page_bookmark") {
    return (
      <>
        <button
          className="rounded-full hover:bg-purple-50 hover:shadow-md flex items-center justify-center p-3"
          {...rest}
        >
          <FontAwesomeIcon
            className={classNames("text-2xl text-yellow-400 bg-blue")}
            icon={faBookMarked}
          />
        </button>
      </>
    );
  }
}

export default Button;
