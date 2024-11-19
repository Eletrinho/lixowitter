import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import "../assets/styles/style.css";
import Header from "../components/Header";

export function DetailedPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <main className="main-container">
        <div className="post-details">
          <div className="user-info">
            <div className="avatar">{post.author.name[0].toUpperCase()}</div>
            <span className="name">{post.author.name}</span>
            <span className="username">@{post.author.username}</span>
          </div>
          <p className="post-content" id="post-content">
            {post.body}
          </p>
          <span className="post-date" id="post-date">
            {new Date(post.date).toLocaleString()}
          </span>
        </div>

        <section className="comments">
          <h2>Comments</h2>
          {post.comments.map((comment) => (
            <Post
              key={comment.id}
              id={comment.id}
              name={comment.author.name}
              username={comment.author.username}
              content={comment.text}
              date={comment.date}
            />
          ))}
        </section>
      </main>
    </>
  );
}
