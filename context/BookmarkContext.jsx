import React, { createContext, useEffect, useState } from "react";

export const BookmarkContext = createContext(null);

function BookmarkContextProvider({ children }) {
  const [bookmark, setBookmark] = useState(
    JSON.parse(localStorage.getItem("BookMark")) || []
  );

  useEffect(() => {
    localStorage.setItem("BookMark", JSON.stringify(bookmark));
  }, [bookmark]);

  //  FUNCTION TO ADD BOOKMARK
  const handleAddBookMark = (item, bookmarkWord) => {
    const isfound = bookmark.some((e) => e.word == item);
    const updatedBookMark = [...bookmark, bookmarkWord];
    if (!isfound) {
      return setBookmark(updatedBookMark);
    }
  };

  //  FUNCTION TO REMOVE A BOOKMARK
  const handleRemoveBookMark = (item) => {
    const updatedBookmark = bookmark.filter((e) => e.word !== item);
    return setBookmark(updatedBookmark);
  };


  // // FUNCTION FOR MAKING AUDIO PAUSE
  // const handleAudioPause = () => {
  //   setPlayMode(false);
  //   const audio = document.querySelector("#myaudio");
  //   audio.pause();
  // };

  return (
    <BookmarkContext.Provider
      value={{
        bookmark,
        setBookmark,
        handleAddBookMark,
        handleRemoveBookMark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkContextProvider;
