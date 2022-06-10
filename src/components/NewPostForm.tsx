import {
  FormEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState
} from "react";
import Modal from "./Modal";
import classes from "./NewPostForm.module.css";

const isEmpty = (value: string | undefined) => value?.trim() === "";

interface NewPostFormProps {
  onHideModal: () => void;
  onAddNewPost: (newPost: any) => void;
}

const NewPostForm: FunctionComponent<NewPostFormProps> = ({
  onHideModal,
  onAddNewPost
}) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fakingRequest, setFakingRequest] = useState({
    faking: false,
    newPost: {}
  });
  const [timeOutId, setTimeOutId] = useState<undefined | number>(undefined);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [formInputsValidity, setFormInputsValidity] = useState({
    titleValidity: true,
    contentValidity: true
  });

  useEffect(() => {
    if (fakingRequest.faking) {
      const addNewPostHandler = async (newPost: any) => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
        );

        const responseData = await response.json();
        setIsSubmitting(true);
        /*  The response return always id:101 */
        console.log(responseData);

        /*delay on purpose to show a loading 3 seconds */
        const storedTimeOutId = setTimeout(() => {
          onAddNewPost(newPost);
          setIsSubmitting(false);
          setDidSubmit(true);
        }, 3000);

        setTimeOutId(storedTimeOutId);
      };

      addNewPostHandler(fakingRequest.newPost);
    }

    return () => {
      console.log("Clearing timeout...");
      clearTimeout(timeOutId);
    };
  }, [fakingRequest]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredTitle = titleInputRef.current?.value;
    const enteredContent = contentInputRef.current?.value;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredContentIsValid = !isEmpty(enteredContent);

    const formIsValid = enteredContentIsValid && enteredTitleIsValid;

    setFormInputsValidity({
      titleValidity: enteredTitleIsValid,
      contentValidity: enteredContentIsValid
    });

    const newPost = {
      title: enteredTitle,
      body: enteredContent,
      userId: 1
    };

    if (formIsValid) {
      setFakingRequest({ faking: true, newPost });
    }
  };

  const titleControlClasses = `${classes.control} ${
    formInputsValidity.titleValidity ? "" : classes.invalid
  }`;

  const contentControlClasses = `${classes.control} ${
    formInputsValidity.contentValidity ? "" : classes.invalid
  }`;

  const formContent = (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={titleControlClasses}>
        <label htmlFor="">Title Post</label>
        <input type="text" ref={titleInputRef} />
        {!formInputsValidity.titleValidity && <p>Please entered a title</p>}
      </div>
      <div className={contentControlClasses}>
        <label htmlFor="">Content Post</label>
        <textarea ref={contentInputRef} />
        {!formInputsValidity.contentValidity && (
          <p>Ups you forgot the content of your post</p>
        )}
      </div>
      <div className={classes.actions}>
        <button>Add post</button>
      </div>
    </form>
  );

  const didSubmitModalContent = (
    <div className={classes.container}>
      <p>Your post was succesfully sent!</p>
    </div>
  );

  const isSubmittingContent = (
    <div className={classes.container}>
      <p>Submitting . . .</p>
    </div>
  );

  return (
    <Modal onHideModal={onHideModal}>
      <>
        {isSubmitting && isSubmittingContent}
        {!didSubmit && !isSubmitting && formContent}
        {didSubmit && didSubmitModalContent}
      </>
    </Modal>
  );
};

export default NewPostForm;
