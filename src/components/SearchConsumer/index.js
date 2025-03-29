import MovieContext from '../../context/MovieContext'
import SearchedMovies from '../SearchedMovies'

const SearchConsumer = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput} = value
      console.log(searchInput)

      return <SearchedMovies search={searchInput} />
    }}
  </MovieContext.Consumer>
)

export default SearchConsumer
