import React from 'react';
import ok_pic from '../../images/OK_pic.svg';
import err_pic from '../../images/ERR_pic.svg';
import './PopupInfoTooltip.css';
import useClose from '../../hooks/useClose';

function PopupInfoTooltip(props) {

  const {
    EscClose,
    ClickClose
  } = useClose();

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isErrorMessage, setIsErrorMessage] = React.useState('');

  console.log('isErrorMessage', isErrorMessage)

  React.useEffect(() => {
    if (props.err === 'Failed to fetch') {
      setIsPopupOpen(true);
      setIsErrorMessage('Извините, на сервере произошла ошибка. Попробуйте перезагрузить страницу или зайдите позже :((');
    }
  }, [props.err])





  
  const closePopup = () => {
    setIsPopupOpen(false);
    setIsErrorMessage('');
  }



  // useEscClose(props.isOpen, closePopup);

  // useClickClose(props.isOpen, closePopup, "popup_opened");

  React.useEffect(() => {
    if (!isPopupOpen) return;

    function handleClickClose(e) {
      if (e.target.className.includes("popup_opened")) {
        closePopup();
      }
    }
    document.addEventListener("mousedown", handleClickClose);    
    return () => {document.removeEventListener("mousedown", handleClickClose)
    }
  }, [isPopupOpen, props, props.isOpen]);

  return(
    <div className={`popup popup_type_tooltip ${isPopupOpen ? 'popup_opened' : ''}`}>
        <div className="popup__window">
          <button 
            className="popup__close-button" 
            type="button" 
            aria-label="Закрыть"
            onClick={closePopup}>
          </button>
          <div className="popup__content">
            <img className="popup__image" src={props.onRegistered ? ok_pic : err_pic} alt="Изображение"  />
            <h2 className="popup__text">{props.onRegistered ? 'Вы успешно зарегистрировались!' : isErrorMessage}</h2>
          </div>
        </div>
      </div>
  )
}

export default PopupInfoTooltip;