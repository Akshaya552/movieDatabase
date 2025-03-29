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

const PopularMovies = () => {
  const [popularList, setPopularList] = useState([])
  const [active, setActive] = useState(apiConstants.initial)

  useEffect(() => {
    setActive(apiConstants.inProgress)
    const fetchPopularMovies = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US&page=1',
      )
      if (response.ok === true) {
        const data = await response.json()
        const movieList = data.results.map(each => ({
          id: each.id,
          posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
          title: each.title,
          voteAverage: each.vote_average,
        }))
        setPopularList(movieList)
        setActive(apiConstants.success)
      } else {
        setActive(apiConstants.failure)
      }
    }
    fetchPopularMovies()
  }, [])

  const renderSuccess = () => (
    <ul className="popular-unordered-list">
      {popularList.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  )

  const renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1743195893/Decrease_3_preview_rev_1_ebwqtg.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  const renderLoader = () => (
    <div className="failure-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderPopular = () => {
    switch (active) {
      case apiConstants.success:
        return renderSuccess()
      case apiConstants.inProgress:
        return renderLoader()
      case apiConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="popular-container">{renderPopular()}</div>
    </>
  )
}

export default PopularMovies
