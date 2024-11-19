import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import '../assets/styles/style.css';
import icon from "../assets/images/icon.png";


export function DetailedPost() {
    const {id} = useParams()
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/posts/${id}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setPost(data)
                console.log(data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        };

        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return ( 
        <div className="posts">
            <div className="post"> 
                <a href={`profile/${post.author.username}`}>
                    <img src={icon} className="icon" alt="" />
                </a> 
                <span className='cabecario'>
                    <p className="name"><b>{post.author.name}</b></p>
                    <p className="name">@{post.author.username}</p>
                </span>
                <div className="content">
                    {post.body}
                    <p className='date'> {new Date(post.date).toLocaleString()}</p>
                </div>
            </div>
            <h1>Comentários</h1>
            {post.comments.map((comment) => (
                <Post key={comment.id} id={comment.id} name={comment.author.name} username={comment.author.username} content={comment.text} date={comment.date} />
            ))}
        </div>
    )
}