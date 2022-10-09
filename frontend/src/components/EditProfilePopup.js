import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="editForm"
      title="Edit profile"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-name"
        value={name || ""}
        onChange={handleNameChange}
        id="name-input"
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input popup__input-about"
        onChange={handleDescriptionChange}
        value={description || ""}
        id="about-input"
        type="text"
        name="about"
        placeholder="About"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
