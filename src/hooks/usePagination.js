import React from "react";

function usePagination() {
  // const PAGE_size = 4;
  const [numberOfFilms, setnumberOfFilms] = React.useState(12);
  // const [visibleData, setVisibleData] = React.useState([])

  // console.log(movies)
  // console.log(visibleData)

  const handleLoadMore = () => {
    setnumberOfFilms(numberOfFilms + 3)
  }

  // React.useEffect(() => {
  //   if (movies) {const numberOfItems = PAGE_size * ( index +1 ); 
  //   const newArray = []
  //   for(let i= 0; i< movies.length; i++ ){
  //     if(i < numberOfItems) 
  //         newArray.push(movies[i])
  //   }
  //   setVisibleData(newArray);}
  // }, [])

  return {
    handleLoadMore,
    numberOfFilms
  }

}

export default usePagination;