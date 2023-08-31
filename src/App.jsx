import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BookmarkContextProvider from "../context/BookmarkContext";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import WordSearch from "./pages/WordSearch";
import Bookmark from "./pages/Bookmark";

function App() {

  return (
    <BookmarkContextProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wordsearch" element={<WordSearch />} />
          <Route path="/bookmark" element={<Bookmark/>} />
        </Route>
      </Routes>
    </BookmarkContextProvider>
  );
}

export default App;
