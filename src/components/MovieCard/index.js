import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movie} = props
  const {id, posterPath, title, voteAverage} = movie

  return (
    <li className="moviecard-list-item">
      <div>
        <img src={posterPath} alt={title} className="moviecard-image" />
        <h1 className="moviecard-title">{title}</h1>
        <p className="moviecard-rating">Rating : {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="moviecard-link-item">
        <button type="button" className="view-details-button">
          View details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
