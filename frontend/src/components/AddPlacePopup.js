import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = React.useRef("");
  const linkRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="placeForm"
      title="New place"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-description"
        ref={nameRef}
        id="description-input"
        type="text"
        name="description"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
      />
      <span className="popup__error description-input-error"></span>
      <input
        className="popup__input popup__input-link"
        ref={linkRef}
        id="link-input"
        type="url"
        name="link"
        placeholder="Image URL"
        required
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
