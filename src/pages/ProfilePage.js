import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/styles/profile.css";
import Post from "../components/Post";

export const ProfilePage = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([])
  const bio = null;
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/search?username=${username}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <>
      <Header />
      <div className="profile-page">
      <div className="profile-header">
        <div className="avatar-large">{username[0].toUpperCase()}</div>
        <div className="profile-info">
          <h1 className="profile-name">*aqui era pra ser o nome*</h1>
          <p className="profile-username">@{username}</p>
          <p className="profile-bio">{bio || "This user hasn't added a bio yet."}</p>
        </div>
      </div>
      <div className="profile-posts">
        <h2 className="section-title">Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.author.name}
              username={post.author.username}
              content={post.body}
              date={post.date}
            />
          ))
        ) : (
          <p className="no-posts">This user hasn't posted anything yet.</p>
        )}
      </div>
    </div>
    </>
  );
};
