import successPath from '../images/Success.svg';
import failurePath from '../images/Failure.svg';

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} && ${
        props.isOpen && 'popup_open'
      } `}
    >
      <div className="popup__alert">
        <button
          aria-label="close"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__registration-image"
          alt="Status logo"
          src={props.status === false ? failurePath : successPath}
        />
        <h2 className="popup__info-text">
          {props.status === false
            ? 'Oops, something went wrong! Please try again.'
            : 'Success! You have now been registered.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
