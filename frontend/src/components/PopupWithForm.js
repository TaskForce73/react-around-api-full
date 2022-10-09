function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} && ${
        props.isOpen && "popup_open"
      } `}
    >
      <div className="popup__body">
        <button
          aria-label="close"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
