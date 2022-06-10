import { useReducer, useState, useEffect, Dispatch } from "react";
export interface Post {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

enum ActionType {
  FETCH = "FETCH_ALL_POSTS",
  POST = "ADD_NEW_POST",
  DELETE = "DELETE_POST"
}

interface PostsAction {
  type: ActionType;
  payload: Post[] | [];
}
type PostState = Post[] | [];

interface UsePosts {
  initialFetch: boolean;
}

export const usePosts = ({ initialFetch }: Partial<UsePosts>) => {
  const initialState: PostState = [];

  function postsReducer(state: PostState, action: PostsAction): PostState {
    switch (action.type) {
      case ActionType.FETCH:
        return [...action.payload];
      case ActionType.POST:
        return [...state, ...action.payload];
      case ActionType.DELETE:
        const [removePost] = action.payload;
        const upDateList = state.filter((post) => {
          return post.id !== removePost.id;
        });
        return upDateList;
      default:
        return state;
    }
  }

  const [listOfPosts, dispatch]: [
    PostState,
    Dispatch<PostsAction>
  ] = useReducer(postsReducer, initialState);

  const [httpError, setHttpError] = useState({
    error: false,
    errorMessage: ""
  });

  useEffect(() => {
    if (initialFetch) {
      const fetchPosts = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw Error("Something went wrong!");
        }

        const responseData = await response.json();

        dispatch({
          type: ActionType.FETCH,
          payload: responseData
        });
      };
      fetchPosts().catch((error) => {
        setHttpError({ error: true, errorMessage: error.message });
      });
    }
  }, [initialFetch]);

  const addNewPost = (newPost: Post) => {
    //Horrible  but i needed  to fake an id //
    const post = { ...newPost, id: listOfPosts.length };
    dispatch({ type: ActionType.POST, payload: [post] });
  };

  const deletePost = (post: any) => {
    dispatch({ type: ActionType.DELETE, payload: [post] });
  };

  return {
    addNewPost,
    deletePost,
    httpError,
    listOfPosts
  };
};

export default usePosts;
