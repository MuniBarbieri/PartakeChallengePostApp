import { useState, FunctionComponent } from "react";
import PostsList from "./components/PostsList";
import NavBar from "./components/NavBar";
import NewPostForm from "./components/NewPostForm";
import usePosts from "./hooks/usePosts";
import "./styles.css";

const App: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const { addNewPost, deletePost, httpError, listOfPosts } = usePosts({
    initialFetch: true
  });

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div>
      {httpError.error && <p>Failed to fetch posts</p>}
      {showModal && (
        <NewPostForm onHideModal={hideModalHandler} onAddNewPost={addNewPost} />
      )}
      <NavBar onShowModal={showModalHandler} />
      <main className="main">
        {" "}
        <PostsList posts={listOfPosts} onDeletePost={deletePost} />
      </main>
    </div>
  );
};

export default App;
