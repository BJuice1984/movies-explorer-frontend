import React from "react";

function usePagination() {
  const [numberOfFilms, setnumberOfFilms] = React.useState(12);

  const handleLoadMore = () => {
    setnumberOfFilms(numberOfFilms + 30)
  }

  return {
    handleLoadMore,
    numberOfFilms
  }

}

export default usePagination;