function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_imageForm ${props.isOpen && "popup_open"}`}
    >
      <div className="popup__wrapper">
        <button
          aria-label="close"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={`Photo of ${props.card.name}`}
        />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
