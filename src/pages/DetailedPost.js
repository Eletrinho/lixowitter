import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import "../assets/styles/style.css";
import Header from "../components/Header";
import axios from "axios";


export function DetailedPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        data.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComments(data.comments);
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

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Não permite comentários vazios
    try {
      const response = await axios.post(`http://localhost:8080/comments/${id}`,{ text: newComment });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Erro ao adicionar o comentário:", error);
    }
  };

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
        <div className="comment-box">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <h2>Comments</h2>
          {comments.map((comment) => (
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
