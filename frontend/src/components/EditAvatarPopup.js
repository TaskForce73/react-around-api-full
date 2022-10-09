import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatarForm"
      title="Change profile picture"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-avatar"
        ref={avatarRef}
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="url"
        required
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
