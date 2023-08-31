import {
  faLink,
  faPlusCircle,
  faWarning,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { BookmarkContext } from "../../context/BookmarkContext";
import Button from "../components/Button";
import AOS from "aos";

function WordSearch() {
  const { bookmark, handleAddBookMark, handleRemoveBookMark, handleAudioPlay } =
    useContext(BookmarkContext);
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [notFoundError, setNotFoundError] = useState("");
  const [searchedWord, setSearchedWord] = useState();

  const isBookMark = bookmark.some((e) => e?.word === searchedWord?.word);

  useEffect(() => {
    AOS.init();
  }, []);

  // A FUNCTION FOR THE SEARCH OPERATION AFTER SUBMITTING
  const submit = async (e) => {
    e.preventDefault();

    setSearchedWord("");

    if (text == "" || null)
      return setValidationError("Blank field is not allowed for search!");

    // this ensure users can not submit blank spaces and uppercase words
    const trimmedWord = text.trim().toLowerCase();

    try {
      setIsLoading(!isLoading);
      const res = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${trimmedWord}`
      );
      setSearchedWord(res.data[0]);
      setText("");
    } catch (error) {
      let message =
        typeof error.response !== "undefined"
          ? error.response.data.message
          : error.message;
      if (error.request.status === 0) {
        setNetworkError("Network Error. Please connect to the Internet.");
        setTimeout(() => setNetworkError(""), 6000);
      }

      if (error.request.status === 404) {
        setNotFoundError(message);
        setTimeout(() => setNotFoundError(""), 6000);
      }

      console.warn("error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  // A FUNCTION THAT CLEARS ERROR MESSAGE AS SOON AS USER STARTS ATTEMPTING CORRECTION
  useEffect(() => {
    text.length > 0 ? setValidationError("") : "";
  }, [text]);

  return (
    <main>
      {/* SEARCH BAR SECTION STARTS HERE */}
      <section className="bg-gradient-to-br relative from-purple-800 to-purple-50 h-72 lg:h-80 pt-16 px-10 lg:px-32">
        <form
          onSubmit={submit}
          className="w-full md:w-[600px] absolute left-1/2 -translate-x-1/2 bottom-5 p-5"
        >
          <legend
            data-aos="fade-up"
            data-aos-easing="ease-in"
            data-aos-duration="1000"
            className="text-center text-xl lg:text-5xl lg:mb-5 text-white font-alkatra font-bold tracking-widest uppercase"
          >
            Enter a word
          </legend>
          <fieldset>
            <div className="flex items-center justify-center mt-5">
              <label htmlFor="word" className="sr-only block">
                word
              </label>
              <div className="flex border-2 border-purple-200 rounded">
                <input
                  id="word"
                  name="word"
                  type="text"
                  placeholder="Search for a word..."
                  className="outline-none shadow w-full md:w-[450px] py-3 text-base px-4"
                  value={text}
                  onChange={(e) => setText(e.target.value.trim())}
                />
                <Button type="search" />
              </div>
            </div>
          </fieldset>
        </form>
        {validationError && (
          <p
            aria-live="aggressive"
            className="text-red-800 tracking-wider rounded-md border border-red-500 lg:text-lg bg-red-400 bg-opacity-40 absolute left-20 lg:left-24 -bottom-1 lg:bottom-40 lg:w-fit px-3 py-2 backdrop:bg-transparent"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-1" icon={faXmarkCircle} />
            {validationError}
          </p>
        )}
      </section>
      {/* SEARCH BAR SECTION ENDS HERE */}

      {/* WORD INFO SECTION STARTS HERE */}
      <section className="px-6 md:px-24 xl:px-80 mt-4 md:mt-14 tracking-wide lg:tracking-widest">
        {/* THIS TO DISPLAY WHEN SEARCH IS COMPLETE AND THERE IS INFORMATION TO DISPLAY */}
        {searchedWord && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-4xl lg:text-5xl font-bold text-fuchsia-900 font-alkatra capitalize">
                {searchedWord?.word}
              </p>

              <Button
                type="bookmark"
                onClick={
                  isBookMark
                    ? () => handleRemoveBookMark(searchedWord?.word)
                    : () => handleAddBookMark(searchedWord?.word, searchedWord)
                }
                isBookMark={isBookMark}
              />
            </div>

            <Button
              type="audio"
              audioId="#myaudio"
              src={
                searchedWord?.phonetics[0]?.audio ??
                searchedWord?.phonetics[1]?.audio
              }
              onClick={handleAudioPlay}
              phonetics={
                searchedWord?.phonetics[0]?.text ??
                searchedWord?.phonetics[1]?.text
              }
            />

            {searchedWord?.meanings.map(
              ({ partOfSpeech, definitions, antonyms, synonyms }, index) => (
                <div key={index} className="mt-10">
                  <p className="relative after:absolute after:inline-block after:bg-gray-300 after:-right-[120px] lg:after:-right-40 font-bold font-alkatra text-lg overflow-hidden after:w-full after:h-[0.5px] after:top-1/2 after:translate-y-1/2">
                    {partOfSpeech}
                  </p>
                  <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-3">
                    meaning
                  </p>

                  {definitions?.map(({ definition }, index) => (
                    <p className="mb-2 last:mb-0" key={index}>
                      <FontAwesomeIcon
                        className="text-fuchsia-700 mr-2"
                        icon={faPlusCircle}
                      />
                      {definition}
                    </p>
                  ))}

                  {/* THIS IS FOR SENTENCE EXAMPLES WITH THE WORD */}
                  {definitions[0].example && (
                    <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                        example
                      </p>
                      <p>{definitions[0].example}</p>
                    </>
                  )}

                  {antonyms.length !== 0 ? (
                    <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                        antonyms:
                      </p>
                      <p>
                        {antonyms.map((item, index) => (
                          <span key={index}>
                            {index !== antonyms.length - 1
                              ? `${item}, `
                              : `${item}.`}
                          </span>
                        ))}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                        antonyms:
                      </p>
                      <p className="italic text-sm">No antonym to display</p>
                    </>
                  )}

                  {synonyms.length !== 0 ? (
                    <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                        synonyms:
                      </p>
                      <p>
                        {synonyms.map((item, index) => (
                          <span key={index}>
                            {index !== synonyms.length - 1
                              ? `${item}, `
                              : `${item}.`}
                          </span>
                        ))}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                        synonyms:
                      </p>
                      <p className="italic text-sm">No synonym to display</p>
                    </>
                  )}
                </div>
              )
            )}

            <div className="inline-flex relative items-start md:items-center gap-2 tracking-wide pt-10">
              <p>Source:</p>
              <a
                target="_blank"
                href={searchedWord?.sourceUrls}
                className="text-xs underline cursor-pointer break-all peer"
              >
                {searchedWord?.sourceUrls}
              </a>
              <FontAwesomeIcon
                className="peer-hover:visible invisible absolute h-4 w-4 -top-1 text-gray-900 -right-5"
                icon={faLink}
              />
            </div>
          </>
        )}

        {/* THIS IS TO DISPLAY WHILE SEARCH IS STILL LOADING */}
        {isLoading && (
          <div className="mt-10">
            <Skeleton className="" count={6} />
          </div>
        )}

        {/* THIS IS TO DISPLAY WHEN THERE IS A NETWORK ERROR */}
        {!isLoading ? (
          !networkError ? (
            !searchedWord && !notFoundError ? (
              <p className="text-center mt-20 text-purple-900 font-bold tracking-wider">
                You need to search for a word
              </p>
            ) : (
              ""
            )
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {networkError ? (
          <p className="max-w-xl w-full mx-auto tracking-wider py-2 bg-orange-500 bg-opacity-20 text-orange-500 text-center text-lg">
            <FontAwesomeIcon icon={faWarning} />
            {networkError}
          </p>
        ) : (
          ""
        )}

        {notFoundError && (
          <p
            aria-live="aggressive"
            className="max-w-xl w-full mx-auto tracking-wider py-2 bg-yellow-200 bg-opacity-20 text-yellow-400 text-center text-lg mt-16"
          >
            <FontAwesomeIcon icon={faWarning} /> {notFoundError}
          </p>
        )}
      </section>
      {/* WORD INFO SECTION ENDS HERE */}
    </main>
  );
}

export default WordSearch;
