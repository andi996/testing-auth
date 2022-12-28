import React from "react";

export default function ModalDarkBackground({ children }) {
  return (
    <>
      <style jsx>{`
        .modal-dark {
          background-color: rgba(30, 30, 30, 0.502131);
        }
      `}</style>
      <div className="modal-dark">{children}</div>
    </>
  );
}
