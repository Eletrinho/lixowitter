import "../assets/styles/style.css";

export default function Post({ id, username, name, content, date }) {
  date = new Date(date);
  let now = new Date();
  let hours = Math.floor((now - date) / (1000 * 60 * 60));

  return (
    <a href={`post/${id}`} className="post-link">
      <div className="post">
        <div className="user-info">
          <div className="avatar">{username[0].toUpperCase()}</div>
          <a href={`/profile/${username}`} className="post-link">
            <span className="name">{name}</span>
            <span className="username"> @{username}</span>
            <span className="post-hour">· {hours}h</span>
          </a>
        </div>
        <p className="post-content">{content}</p>
        <div className="post-actions">
          <button>Like</button>
          <button>Comment</button>
        </div>
      </div>
    </a>
  );
}
