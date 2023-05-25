import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,image,body,createdAt,author}) {

    return (
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:8080/'+image} alt=""/>
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
          <p className="info">
            <p className="author">{author}</p>
            <time>{formatISO9075(new Date(createdAt))}</time>
            <p className="summary">{body}</p>
          </p>
        </div>
      </div>
    );
  }