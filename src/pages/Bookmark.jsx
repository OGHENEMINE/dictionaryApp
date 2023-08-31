import {
  faAngleDown,
  faAngleUp,
  faBookmark,
  faLink,
  faPlusCircle,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import classNames from "classnames";
import Button from "../components/Button";

function Bookmark() {
  const { bookmark, handleRemoveBookMark, handleAudioPlay } =
    useContext(BookmarkContext);
  const [view, setView] = useState(Array(bookmark.length).fill(false));

  const handleDropDown = (id) => {
    const updatedView = view.map((item, index) => {
      if (index === id) {
        return !item;
      } else {
        return item;
      }
    });

    return setView(updatedView);
  };

  return (
    <main>
      <section className="bg-gradient-to-br relative tracking-widest text-center from-purple-800 to-purple-50 h-72 lg:h-80 pt-16 px-10 lg:px-32">
        <h1 className="uppercase text-5xl mt-20 font-bold font-alkatra text-white">
          bookmark
          <FontAwesomeIcon className="text-yellow-300 mb-1.5 text-3xl" icon={faStar} />
        </h1>
        <p className="text-fuchsia-900 mt-3">
          Get saved words easily. No internet, no problem.
        </p>
      </section>

      <section className="px-6 md:px-24 xl:px-80 mt-4 md:mt-14 tracking-wide lg:tracking-widest">
        {bookmark.map(({ meanings, phonetics, sourceUrls, word }, index) => (
          <div
            key={index}
            className="shadow-md shadow-purple-100 rounded mb-16 last:mb-0 p-5"
          >
            {/* THIS IS THE GROUPING OF A BOOKMARKED WORD AND STAR SYMBOL */}

            <div className="flex items-center justify-between">
              {/* THIS IS THE GROUP OF THE WORD AND DROPDOWN SYMBOL */}
              <div className="flex items-center gap-1">
                <p className="capitalize tracking-wider font-alkatra text-3xl text-fuchsia-900 font-bold">
                  {word}
                </p>
                <button
                  onClick={() => handleDropDown(index)}
                  className="flex items-center justify-center shadow hover:bg-purple-100 rounded-full py-1 px-1.5"
                >
                  <FontAwesomeIcon
                    className="text-xs text-fuchsia-900"
                    icon={view[index] === true ? faAngleUp : faAngleDown}
                  />
                </button>
              </div>

              {/* THIS IS THE END OF THE GROUPING OF THE WORD AND DROPDOWN SYMBOL */}

              <Button
                type="bookmark_page_bookmark"
                onClick={() => handleRemoveBookMark(word)}
              />
            </div>

            {/* DROPDOWN STARTS HERE */}
            <div className={view[index] === true ? "" : "hidden"}>
              <Button
                type="audio"
                src={view[index] === true? phonetics[0]?.audio?? phonetics[1]?.audio : ""}
                phonetics={phonetics[0]?.text?? phonetics[1]?.text}
              />

              {/* THIS IS THE END OF GROUPING OF A BOOKMARKED WORD AND STAR SYMBOL */}

              {meanings.map(
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
                  href={sourceUrls}
                  className="text-xs underline cursor-pointer break-all peer"
                >
                  {sourceUrls}
                </a>
                <FontAwesomeIcon
                  className="peer-hover:visible invisible absolute h-4 w-4 -top-1 text-gray-900 -right-5"
                  icon={faLink}
                />
              </div>
            </div>
            {/* DROPDOWN ENDS HERE */}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Bookmark;
