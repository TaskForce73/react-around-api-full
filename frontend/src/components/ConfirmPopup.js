import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="confirmForm"
      title="Are you shure?"
      buttonText="Yes"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
