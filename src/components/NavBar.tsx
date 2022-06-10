import { FunctionComponent } from "react";
import classes from "./NavBar.module.css";

interface NavBarProps {
  onShowModal: () => void;
}

const Navbar: FunctionComponent<NavBarProps> = ({ onShowModal }) => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.logo}>Wonderful Posts</h1>
        <nav>
          <ul>
            <li>
              <div className={classes.actions}>
                <button onClick={onShowModal}>New Post</button>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes.imageContainer}>
        <img
          src="https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
          alt=""
        />
      </div>
    </>
  );
};

export default Navbar;
