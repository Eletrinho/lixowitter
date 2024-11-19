import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../assets/styles/style.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.author.name}
          username={post.author.username}
          content={post.body}
          date={post.date}
        />
      ))}
    </section>
  );
}
