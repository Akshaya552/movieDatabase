import React from 'react'

const MovieContext = React.createContext({
  display: false,
  changeDisplay: () => {},
  searchInput: '',
  changeSearchInput: () => {},
})

export default MovieContext
