import React from 'react';
import ok_pic from '../../images/OK_pic.svg';
import err_pic from '../../images/ERR_pic.svg';
import './PopupInfoTooltip.css';
import useClose from '../../hooks/useClose';
import { OK_FETCH_ANSWER, DATA_CHANGED_SUCCESSFULLY, MAIN_API_ERROR_MESSAGE, FAILED_TO_FETCH } from '../../constants/constatnts';

function PopupInfoTooltip(props) {

  const {
    EscClose,
    ClickClose
  } = useClose();

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isErrorMessage, setIsErrorMessage] = React.useState('');
  const [isErrorPic, setIsErrorPic] = React.useState();

  React.useEffect(() => {
    if (props.err === FAILED_TO_FETCH) {
      setIsPopupOpen(true);
      setIsErrorMessage(MAIN_API_ERROR_MESSAGE);
      setIsErrorPic(false)
    } else if (props.err === OK_FETCH_ANSWER)  {
      setIsPopupOpen(true);
      setIsErrorMessage(DATA_CHANGED_SUCCESSFULLY);
      setIsErrorPic(true)
    }
  }, [props.err])

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsErrorMessage('');
    setIsErrorPic();
  }

  EscClose(isPopupOpen, closePopup);
  ClickClose(isPopupOpen, closePopup, "popup_opened")

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
            <img className="popup__image" src={isErrorPic ? ok_pic : err_pic} alt="Изображение"  />
            <h2 className={`popup__text ${isErrorPic ? 'popup__text_type_valid' : ''}`}>{isErrorMessage}</h2>
          </div>
        </div>
      </div>
  )
}

export default PopupInfoTooltip;