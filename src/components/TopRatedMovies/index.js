import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import './index.css'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const TopRatedMovies = () => {
  const [topmovies, setTopMovies] = useState([])
  const [topstatus, setTopStatus] = useState(apiConstants.initial)

  useEffect(() => {
    setTopStatus(apiConstants.inProgress)
    const fetchTopMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US&page=1`,
      )
      if (response.ok === true) {
        const data = await response.json()
        const toprated = data.results.map(each => ({
          id: each.id,
          posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
          title: each.title,
          voteAverage: each.vote_average,
        }))
        setTopMovies(toprated)
        setTopStatus(apiConstants.success)
      } else {
        setTopStatus(apiConstants.failure)
      }
    }
    fetchTopMovies()
  }, [])

  const renderTopSuccess = () => (
    <ul className="popular-unordered-list">
      {topmovies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  )

  const renderTopFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1743195893/Decrease_3_preview_rev_1_ebwqtg.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  const renderTopLoader = () => (
    <div className="failure-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderTop = () => {
    switch (topstatus) {
      case apiConstants.success:
        return renderTopSuccess()
      case apiConstants.inProgress:
        return renderTopLoader()
      case apiConstants.failure:
        return renderTopFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="popular-container">{renderTop()}</div>
    </>
  )
}

export default TopRatedMovies
