import {Link, useLocation, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import MovieContext from '../../context/MovieContext'
import './index.css'

const Header = props => {
  const tab = useLocation().pathname

  return (
    <MovieContext.Consumer>
      {value => {
        const {display, changeDisplay, searchInput, changeSearchInput} = value

        const onClickmenubutton = () => {
          changeDisplay()
        }

        const {history} = props

        const onInputChange = event => {
          changeSearchInput(event.target.value)
        }

        const onsearchInitiated = () => {
          if (searchInput !== '') {
            history.replace('/searched')
          }
        }

        const onEnterInitiated = event => {
          if (event.key === 'Enter') {
            if (searchInput === '') {
              history.replace('/')
            } else {
              history.replace('/searched')
            }
          }
        }

        return (
          <div className="main-header-container">
            <div className="header-container">
              <Link to="/" className="link-item">
                <h1 className="nav-title">MovieDB</h1>
              </Link>
              <div className="nav-row-container">
                <ul className="nav-unordered-list">
                  <li>
                    <Link to="/" className="link-item">
                      <h1
                        className={
                          tab === '/'
                            ? 'nav-button highlight-button'
                            : 'nav-button'
                        }
                      >
                        Popular
                      </h1>
                    </Link>
                  </li>
                  <li>
                    <Link to="/top-rated" className="link-item">
                      <h1
                        className={
                          tab === '/top-rated'
                            ? 'nav-button highlight-button'
                            : 'nav-button'
                        }
                      >
                        Top Rated
                      </h1>
                    </Link>
                  </li>
                  <li>
                    <Link to="/upcoming" className="link-item">
                      <h1
                        className={
                          tab === '/upcoming'
                            ? 'nav-button highlight-button'
                            : 'nav-button'
                        }
                      >
                        Upcoming
                      </h1>
                    </Link>
                  </li>
                </ul>
                <div className="search-container">
                  <input
                    value={searchInput}
                    onChange={onInputChange}
                    type="textbox"
                    className="search-box"
                    placeholder="Search"
                    onKeyDown={onEnterInitiated}
                  />
                  <button
                    type="button"
                    className="search-button"
                    onClick={onsearchInitiated}
                  >
                    Search
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="menu-button"
                onClick={onClickmenubutton}
              >
                <GiHamburgerMenu />
              </button>
            </div>
            <ul
              className={
                display
                  ? 'small-nav-unordered-list'
                  : 'small-nav-unordered-list toggling'
              }
            >
              <li>
                <Link to="/" className="link-item">
                  <h1
                    className={
                      tab === '/' ? 'nav-button highlight-button' : 'nav-button'
                    }
                  >
                    Popular
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/top-rated" className="link-item">
                  <h1
                    className={
                      tab === '/top-rated'
                        ? 'nav-button highlight-button'
                        : 'nav-button'
                    }
                  >
                    Top Rated
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="link-item">
                  <h1
                    className={
                      tab === '/upcoming'
                        ? 'nav-button highlight-button'
                        : 'nav-button'
                    }
                  >
                    Upcoming
                  </h1>
                </Link>
              </li>
            </ul>
            <div className="small-search-container">
              <input
                value={searchInput}
                onChange={onInputChange}
                type="textbox"
                className="search-box"
                placeholder="Search"
                onKeyDown={onEnterInitiated}
              />
              <button
                type="button"
                className="search-button"
                onClick={onsearchInitiated}
              >
                Search
              </button>
            </div>
          </div>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default withRouter(Header)
