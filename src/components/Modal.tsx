import { FunctionComponent } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

interface BackdropProps {
  onHideModal: () => void;
}

interface ModalOverlayProps {
  children: JSX.Element;
}

interface ModalProps {
  onHideModal: () => void;
  children: JSX.Element;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ onHideModal }) => {
  return (
    <div className={classes.backdrop} onClick={onHideModal}>
      {" "}
    </div>
  );
};

const ModalOverlay: FunctionComponent<ModalOverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div>{children}</div>
    </div>
  );
};

const portalElement: any = document.getElementById("overlays");

const Modal: FunctionComponent<ModalProps> = ({ onHideModal, children }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onHideModal={onHideModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
