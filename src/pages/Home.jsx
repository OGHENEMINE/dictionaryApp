import {
  faLightbulb,
  faPenToSquare,
  faCheckCircle,
  faSearchPlus,
  faBookmark,
  faWarning,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import classNames from "classnames";
import { words } from "../util/words.js";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import MeaningSlide from "../components/MeaningSlide";
import { BookmarkContext } from "../../context/BookmarkContext";
import Button from "../components/Button";
import AOS from "aos";

function Home() {
  const { bookmark, handleAudioPlay, handleAddBookMark, handleRemoveBookMark } =
    useContext(BookmarkContext);
  const [networkError, setNetworkError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [randomWord, setRandomWord] = useState();
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const wordToSearch = words[Math.floor(Math.random() * words.length)];
    const fetchData = async () => {
      try {
        setIsLoading(!isLoading);
        const res = await axios(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`
        );
        setRandomWord(res.data[0]);
      } catch (err) {
        let message = "";
        typeof err.response !== "undefined"
          ? (message = err?.reponse?.data?.message)
          : (message = err?.message);
        console.warn("Error:", message);
        if (err.request.status === 0) {
          return setNetworkError(
            "Network Error. Please connect to the Internet."
          );
        }
        if (err.request.status === 404) {
          console.warn("Error:", "sorry pal. Word not found.");
          const repeatDataFetch = () => setInterval(fetchData(), 1000);
          return () => clearInterval(repeatDataFetch);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isBookMark = bookmark.some((e) => e?.word === randomWord?.word);

  return (
    <>
      <Header />
      <main className="tracking-widest mx-8 mt-10 lg:mx-28">
        <section className="mb-20 mt-48 lg:mt-1">
          <h2
            data-aos="zoom-in-left"
            data-aos-easing="ease-in"
            data-aos-duration="500"
            className="uppercase text-center flex items-center justify-center gap-3 text-purple-900 text-3xl lg:text-5xl mb-10 font-bold font-alkatra"
          >
            <FontAwesomeIcon
              className="w-5 h-5 animate-pulse text-yellow-400"
              icon={faLightbulb}
            />
            word of the day
            <FontAwesomeIcon
              className="w-5 h-5 animate-pulse text-yellow-400"
              icon={faLightbulb}
            />
          </h2>

          <div className="lg:mx-24">
            {networkError && !isLoading ? (
              <p className="max-w-xl w-full mx-auto tracking-wider py-2 bg-orange-500 bg-opacity-20 text-orange-500 text-center text-lg">
                <FontAwesomeIcon icon={faWarning} />
                {networkError}
              </p>
            ) : (
              ""
            )}

            {isLoading ? <Skeleton count={5} /> : ""}

            {!isLoading && randomWord ? (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-3xl lg:text-4xl font-alkatra text-fuchsia-900 font-bold capitalize">
                    {randomWord?.word}
                  </p>

                  <Button
                    type="bookmark"
                    onClick={
                      isBookMark
                        ? () => handleRemoveBookMark(randomWord?.word)
                        : () => handleAddBookMark(randomWord?.word, randomWord)
                    }
                    isBookMark={isBookMark}
                  />
                </div>

                <Button
                  type="audio"
                  audioId="#myaudio"
                  src={
                    randomWord?.phonetics[0]?.audio ??
                    randomWord?.phonetics[1]?.audio
                  }
                  phonetics={
                    randomWord?.phonetics[0]?.text ??
                    randomWord?.phonetics[1]?.text
                  }
                  onClick={handleAudioPlay}
                />

                <MeaningSlide
                  meaningList={randomWord?.meanings}
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                />

                <div className="inline-flex relative items-start md:items-center gap-2 tracking-wide mt-5">
                  <p>Source:</p>
                  <a
                    target="_blank"
                    href={randomWord?.sourceUrl}
                    className="text-xs underline cursor-pointer break-all peer"
                  >
                    {randomWord?.sourceUrls}
                  </a>
                  <FontAwesomeIcon
                    className="peer-hover:visible invisible absolute h-4 w-4 -top-1 text-gray-900 -right-5"
                    icon={faLink}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>

        <section className="my-20">
          <h2
            data-aos="zoom-in-left"
            data-aos-easing="ease-in"
            data-aos-duration="500"
            className="uppercase text-center text-purple-900 font-bold text-3xl lg:text-5xl font-alkatra"
          >
            start exploring{" "}
            <FontAwesomeIcon
              className="text-lg text-yellow-400"
              icon={faSearchPlus}
            />{" "}
          </h2>
          <p className="text-center mt-10 mb-8">
            Start learning and discovering with 3 simple steps.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {[
              {
                title: "Get started",
                icon: faCheckCircle,
                desc: 'Click on the "Get Started" button to navigate to the search page to begin your word search.',
              },
              {
                title: "Enter a word",
                icon: faPenToSquare,
                desc: "In the search bar of the wordsearch page provide a word you would like to learn about.",
              },
              {
                title: "bookmark a word",
                icon: faBookmark,
                desc: "Bookmark or save words you would like to come back to without needing internet connection.",
              },
            ].map(({ title, icon, desc }, index) => (
              <div
                key={index}
                className={classNames(
                  "flex flex-col justify-center rounded-md items-center p-5 text-center shadow shadow-purple-100 text-pink-700"
                )}
              >
                <FontAwesomeIcon
                  className={classNames("w-5 h-5 p-3 rounded-full bg-pink-50")}
                  icon={icon}
                />
                <h6 className="font-bold uppercase tracking-widest my-2">
                  {title}
                </h6>
                <p className="text-black text-sm italic">{desc ?? ""}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            data-aos="zoom-in-left"
            data-aos-easing="ease-in"
            data-aos-duration="500"
            className="uppercase text-center text-purple-900 font-bold text-3xl lg:text-5xl font-alkatra"
          >
            why use word-finder
          </h2>

          <div className="grid tracking-widest grid-cols-1 text-center lg:grid-cols-2 items-center lg:gap-20">
            <img src="/Reading.svg" alt="A girl reading a book illustration." />
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in"
              data-aos-duration="1000"
            >
              <h4 className="text-orange-500 font-bold text-xl lg:text-3xl uppercase">
                Improve your vocabulary
              </h4>
              <p className="mt-4 text-sm leading-8">
                Search up words with{" "}
                <span className="uppercase text-purple-800 text-lg font-alkatra font-bold relative after:absolute after:inline-block after:left-0 after:right-0 after:bottom-1 after:bg-orange-500 after:h-[1px] whitespace-pre">
                  word-finder
                </span>
                . Learn the meaning, the anonym, and synonym of words. Discover
                better word use with sentence examples.
              </p>
            </div>
          </div>

          <hr className="w-80 lg:w-[600px] mx-auto mt-20 mb-10" />

          <div className="grid tracking-widest grid-cols-1 text-center lg:grid-cols-2 items-center lg:gap-20">
            <img className="lg:order-2" src="/NewWord.svg" alt="" />

            <div
              data-aos="fade-right"
              data-aos-easing="ease-in"
              data-aos-duration="1000"
              className="lg:order-1"
            >
              <h4 className="text-orange-500 font-bold text-xl lg:text-3xl uppercase">
                Discover New words
              </h4>
              <p className="mt-4 text-sm leading-8">
                Besides searching up new words.{" "}
                <span className="capitalize text-purple-800 text-lg font-alkatra font-bold relative after:absolute after:inline-block after:left-0 after:right-0 after:bottom-1 after:bg-orange-500 after:h-[1px] whitespace-pre">
                  Discover new words
                </span>{" "}
                with the word-finder{" "}
                <span className="capitalize text-purple-800 text-lg font-alkatra font-bold relative after:absolute after:inline-block after:left-0 after:right-0 after:bottom-1 after:bg-orange-500 after:h-[1px] whitespace-pre">
                  {" "}
                  word of the day
                </span>
                . Daily Random word to learn about.
              </p>
            </div>
          </div>

          <hr className="w-80 lg:w-[600px] mx-auto mt-20 mb-10 lg:mb-20" />

          <div className="grid tracking-widest grid-cols-1 text-center lg:grid-cols-2 items-center lg:gap-20">
            <img src="/BookmarkLady.svg" alt="illustration" />
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              <h4 className="text-orange-500 font-bold text-xl lg:text-3xl uppercase">
                bookmark words
              </h4>
              <p className="mt-4 text-sm leading-8">
                <span className="capitalize text-purple-800 text-lg font-alkatra font-bold relative after:absolute after:inline-block after:left-0 after:right-0 after:bottom-1 after:bg-orange-500 after:h-[1px]">
                  bookmark
                </span>{" "}
                your favourite{" "}
                <span className="capitalize text-purple-800 text-lg font-alkatra font-bold relative after:absolute after:inline-block after:left-0 after:right-0 after:bottom-1 after:bg-orange-500 after:h-[1px]">
                  words
                </span>{" "}
                for later or words you just want to lookup. Come back to saved
                words without having to search.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
