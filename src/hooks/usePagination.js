import React from "react";
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  DESKTOP_NUMBER,
  TABLET_NUMBER,
  MOBILE_NUMBER,
  DESKTOP_MORE_NUMBER,
  TABLET_MORE_NUMBER
  } from '../constants/constatnts';

function usePagination() {
  const [numberOfFilms, setnumberOfFilms] = React.useState(0);
  const [numberMoreFilms, setnumberMoreFilms] = React.useState(0);
  const [clientWidth, setClientWidth] = React.useState(document.documentElement.clientWidth);

  React.useEffect(() => {
    if (clientWidth >= DESKTOP_WIDTH) {
      setnumberOfFilms(DESKTOP_NUMBER);
      setnumberMoreFilms(DESKTOP_MORE_NUMBER);
      return;
    } else if (clientWidth < DESKTOP_WIDTH && clientWidth > TABLET_WIDTH) {
      setnumberOfFilms(TABLET_NUMBER);
      setnumberMoreFilms(TABLET_MORE_NUMBER);
      return;
    } else {
      setnumberOfFilms(MOBILE_NUMBER);
      setnumberMoreFilms(TABLET_MORE_NUMBER);
      return;
    }
  }, [clientWidth]);

  const handleChangeClientWidth = () => {
    setTimeout(() => {
      setClientWidth(document.documentElement.clientWidth);
    }, 1000);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleChangeClientWidth);
    return () => {
      window.removeEventListener('resize', handleChangeClientWidth);
    }
  }, [clientWidth])

  const handleLoadMore = () => {
    setnumberOfFilms(numberOfFilms + numberMoreFilms)
  }

  return {
    handleLoadMore,
    numberOfFilms
  }

}

export default usePagination;