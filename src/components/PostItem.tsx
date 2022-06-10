import { FunctionComponent } from "react";
import Card from "./Card";
import { Post } from "../hooks/usePosts";
import classes from "./PostItem.module.css";

interface PostItemProps {
  post: Post;
  onDeletePost: (id: any) => void;
}

const PostItem: FunctionComponent<PostItemProps> = ({ post, onDeletePost }) => {
  return (
    <Card>
      <li className={classes.item}>
        <div className={classes.content}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={() => onDeletePost(post)}>Remove</button>
        </div>
      </li>
    </Card>
  );
};

export default PostItem;
