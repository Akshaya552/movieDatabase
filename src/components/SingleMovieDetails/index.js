import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const SingleMovieDetails = props => {
  const [singleMovie, setSingleMovie] = useState([])
  const [genres, setgenres] = useState([])
  const [singleMovieCast, setSingleMovieCast] = useState([])
  const [singleStatus, setSingleStatus] = useState(apiConstants.initial)

  const {match} = props
  const {params} = match
  const {id} = params

  useEffect(() => {
    const fetchSingleMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US`,
      )
      if (response.ok === true) {
        const data = await response.json()
        const single = {
          title: data.title,
          posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          voteAverage: data.vote_average,
          releaseDate: data.release_date,
          overview: data.overview,
          tagline: data.tagline,
        }
        const genre = data.genres.map(each => ({id: each.id, name: each.name}))
        setgenres(genre)
        setSingleMovie(single)
        setSingleStatus(apiConstants.success)
      } else {
        setSingleStatus(apiConstants.failure)
      }
    }

    const fetchCastDetails = async () => {
      setSingleStatus(apiConstants.inProgress)
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=10367da7bf727fb1d7dc36c17ab0e4c1&language=en-US`,
      )
      if (res.ok === true) {
        const castdata = await res.json()
        const cast = castdata.cast.map(each => ({
          id: each.id,
          originalName: each.original_name,
          character: each.character,
          profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        }))
        setSingleMovieCast(cast)
      }
    }

    fetchSingleMovie()
    fetchCastDetails()
  }, [id])

  const renderSingleSuccess = () => (
    <div className="movie-details-container">
      <h1 className="singlemovie-title">{singleMovie.title}</h1>
      <p className="tagline">{singleMovie.tagline}</p>
      <div className="poster-text-container">
        <img
          src={singleMovie.posterPath}
          alt={singleMovie.title}
          className="singlemovie-image"
        />

        <div className="movie-details-container">
          <p className="cast-heading">Details</p>
          <p className="singlemovie-rating">
            <span className="singlemovie-subheading">Rating : </span>
            {singleMovie.voteAverage}
          </p>
          <p className="singlemovie-subheading">Genres</p>
          <ul className="genres-unordered-list">
            {genres.map(each => (
              <li key={each.id} className="genre-list-item">
                {each.name}
              </li>
            ))}
          </ul>
          <p className="singlemovie-rating">
            <span className="singlemovie-subheading">Release Date : </span>
            {singleMovie.releaseDate}
          </p>
          <p className="singlemovie-rating">
            <span className="singlemovie-subheading">Overview : </span>
            {singleMovie.overview}
          </p>
        </div>
      </div>
      <p className="cast-heading">Cast</p>
      <ul className="cast-unordered-list">
        {singleMovieCast.map(cast => (
          <li className="cast-list-item">
            <img
              src={cast.profilePath}
              alt={cast.originalName}
              className="cast-image"
            />
            <p className="original-name">{cast.originalName}</p>
            <p className="original-name">{cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSingleFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1743195893/Decrease_3_preview_rev_1_ebwqtg.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  const renderSingleLoader = () => (
    <div className="failure-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  const renderSingleView = () => {
    switch (singleStatus) {
      case apiConstants.success:
        return renderSingleSuccess()
      case apiConstants.inProgress:
        return renderSingleLoader()
      case apiConstants.failure:
        return renderSingleFailure()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="singlemovie-container">{renderSingleView()}</div>
    </>
  )
}

export default SingleMovieDetails
