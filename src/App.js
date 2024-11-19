import "./App.css";
import "./assets/styles/style.css";
import Posts from "./components/Posts";
import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main class="main-container">
        <div class="post-box">
          <textarea placeholder="What's on your mind?" rows="3"></textarea>
          <button>Post</button>
        </div>
        <Posts />
      </main>
    </>
  );
}

export default App;
