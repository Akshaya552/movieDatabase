import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import PopularMovies from './components/PopularMovies'
import SearchConsumer from './components/SearchConsumer'
import SingleMovieDetails from './components/SingleMovieDetails'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import MovieContext from './context/MovieContext'
import './App.css'

class App extends Component {
  state = {searchInput: '', display: false}

  changeDisplay = () => {
    this.setState(prev => ({display: !prev.display}))
  }

  changeSearchInput = search => {
    this.setState({searchInput: search})
  }

  render() {
    const {searchInput, display} = this.state
    return (
      <MovieContext.Provider
        value={{
          display,
          changeDisplay: this.changeDisplay,
          searchInput,
          changeSearchInput: this.changeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={SingleMovieDetails} />
          <Route exact path="/searched" component={SearchConsumer} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
