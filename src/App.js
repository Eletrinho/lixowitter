import "./App.css";
import "./assets/styles/style.css";
import Posts from "./components/Posts";
import React from "react";
import Header from "./components/Header";
import PostMaker from "./components/PostMaker";

function App() {
  return (
    <>
      <Header />
      <main class="main-container">
        <PostMaker/>
        <Posts />
      </main>
    </>
  );
}

export default App;
