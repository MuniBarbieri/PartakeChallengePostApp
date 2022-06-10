import { FunctionComponent } from "react";
import PostItem from "./PostItem";
import { Post } from "../hooks/usePosts";
import classes from "./PostsList.module.css";

interface PostsListProps {
  posts: Post[];
  onDeletePost: (id: any) => void;
}

const PostsList: FunctionComponent<PostsListProps> = ({
  posts,
  onDeletePost
}) => {
  return (
    <div>
      <ul className={classes.list}>
        {posts.map((post, i) => (
          <PostItem key={i} post={post} onDeletePost={onDeletePost} />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
