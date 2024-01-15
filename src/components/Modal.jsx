import ReactDOM, { createPortal } from "react-dom";

import 'animate.css'

const BackdropOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={`animate__animated animate__fadeIn fixed inset-x-0 bottom-0 top-auto md:top-0 w-full h-auto md:h-screen flex justify-center z-50 transition-all duration-300 ease-in-out items-center opacity-100 scale-100`}>
      <div className="bg-white pt-14 pb-5 rounded-xl w-[32rem] max-md:rounded-t-2xl max-md:w-full">
        {children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;