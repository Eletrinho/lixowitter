import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/postmaker.css";

export default function PostMaker() {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!body.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    setLoading(true);
    setError(""); // Limpa erros anteriores
    try {
      await axios.post("http://localhost:8080/posts", { body });
      setBody("");
    } catch (e) {
      console.error(e);
      setError("An error occurred while sending the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-box">
      <textarea
        className="post-input"
        placeholder="What's on your mind?"
        rows="3"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={loading}
      ></textarea>
      {error && <p className="error-message">{error}</p>}
      <button className="post-button" onClick={handlePost} disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
