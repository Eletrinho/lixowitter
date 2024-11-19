import '../assets/styles/style.css';
import icon from "../assets/images/icon.png";

export default function Post({id, username, name, content, date}) {
    date = new Date(date);
    let now = new Date();
    let hours = Math.floor((now - date) / (1000 * 60 * 60));
    
    return (
        <a href={`post/${id}`} className="posts">
            <div className="post"> 
                <a href={`profile/${username}`}>
                    <img src={icon} className="icon" alt="" />
                </a> 
                <span className='cabecario'>
                    <p className="name"><b>{name}</b></p>
                    <p className="name">@{username}</p>
                    <p className='date' title={date.toLocaleString()}> · {hours}h</p>
                </span>
                <div className="content">{content}</div>
            </div>
        </a>
    )
}
