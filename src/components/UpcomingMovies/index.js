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

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [upcomingStatus, setUpcomingStatus] = useState(apiConstants.initial)

  useEffect(() => {
    setUpcomingStatus(apiConstants.inProgress)
    const fetchTopMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US&page=1`,
      )
      if (response.ok === true) {
        const data = await response.json()
        const upcoming = data.results.map(each => ({
          id: each.id,
          posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
          title: each.title,
          voteAverage: each.vote_average,
        }))
        setUpcomingMovies(upcoming)
        setUpcomingStatus(apiConstants.success)
      } else {
        setUpcomingStatus(apiConstants.failure)
      }
    }
    fetchTopMovies()
  }, [])

  const renderUpcomingSuccess = () => (
    <ul className="popular-unordered-list">
      {upcomingMovies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  )

  const renderUpcomingFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1743195893/Decrease_3_preview_rev_1_ebwqtg.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  const renderUpcomingLoader = () => (
    <div className="failure-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderUpcoming = () => {
    switch (upcomingStatus) {
      case apiConstants.success:
        return renderUpcomingSuccess()
      case apiConstants.inProgress:
        return renderUpcomingLoader()
      case apiConstants.failure:
        return renderUpcomingFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="popular-container">{renderUpcoming()}</div>
    </>
  )
}

export default UpcomingMovies
