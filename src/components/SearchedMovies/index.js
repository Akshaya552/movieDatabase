import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const SearchedMovies = props => {
  const {search} = props
  const [searchedList, setSearchedList] = useState([])
  const [searchStatus, setSearchStatus] = useState(apiConstants.initial)

  useEffect(() => {
    setSearchStatus(apiConstants.inProgress)
    if (search !== undefined) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US&query=${search}&page=1`,
        )
        if (response.ok === true) {
          const data = await response.json()
          const searched = data.results.map(each => ({
            id: each.id,
            posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
            title: each.title,
            voteAverage: each.vote_average,
          }))
          setSearchedList(searched)
          setSearchStatus(apiConstants.success)
        } else {
          setSearchStatus(apiConstants.failure)
        }
      }
      fetchSearch()
    }
  }, [search])

  const renderSearchSuccess = () => (
    <ul className="popular-unordered-list">
      {searchedList.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  )

  const renderSearchFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1743195893/Decrease_3_preview_rev_1_ebwqtg.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  const renderSerchLoader = () => (
    <div className="failure-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderSearch = () => {
    switch (searchStatus) {
      case apiConstants.success:
        return renderSearchSuccess()
      case apiConstants.inProgress:
        return renderSerchLoader()
      case apiConstants.failure:
        return renderSearchFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="popular-container">{renderSearch()}</div>
    </>
  )
}

export default SearchedMovies
