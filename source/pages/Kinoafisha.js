// Core
import React, {Component} from 'react';
import cx from 'classnames';

// Helpers
import { getStyles } from "../helpers";

// API
import { api } from "../API";

export class Kinoafisha extends Component {
    state = {
        selectedFilter: 'upcoming',
        selectedMovie: '',
        selectedSort: '',
        movies: [],
    };

    componentDidMount ( ) {
        this._getMoviesByFilter(this.state.selectedFilter);
    };

    _getMoviesByFilter = async (nextFilter) => {
        const movies = await api.getMovies(nextFilter);
        //console.log(movies);
        //const desc_sorted = movies.sort((a, b) => b.release - a.release);
        //console.log(desc_sorted);
        this.setState({
            movies,
        });
    };

    _selectFilter = (event) => {
        const nextFilter = event.currentTarget.dataset.name;

        this.setState({
            selectedFilter: nextFilter,
        });

        this._getMoviesByFilter(nextFilter);
    };

    _toggleSort = (event) => {
        const currentSort = this.state.selectedSort
            ? ''
            : 'desc';
        //console.log(currentSort);
        this.setState({
            selectedSort: currentSort,
        });
        if (currentSort === 'desc') {
            var newmovies = this.state.movies.sort((a, b) => a.release - b.release);
        } else {
            var newmovies = this.state.movies.sort((a, b) => b.release - a.release);
        }
        this.setState({
            movies: newmovies,
        });
    };

    _selectMovie = (movieId) => ( ) => {
        this.setState({
            selectedMovie: movieId,
        });
    };

    render() {
        const styles = getStyles(this.state);

        const moviesJSX = this.state.movies.map((movie) => {
            const posterStyle = cx('poster', {
               selectedPoster: movie.id === this.state.selectedMovie
            });

            return (
                <div className = 'movie'
                     key = { movie.id }
                     onClick = { this._selectMovie(movie.id) }>
                    <div className = { posterStyle }>
                        <span className = 'genre'>{movie.genre}</span>
                        <img src = {movie.poster}/>
                        <span className = 'rating'>{movie.rating}</span>
                    </div>
                    <span className = 'title'>{movie.title}</span>
                </div>
            )
        });

        const myFooter = (
            <>
                <a href = 'mailto:team@lectrum.io'>team@lectrum.io</a>
                <span>
                    2018 © Все права защищены. Разработано с любовью&nbsp;
                    <a href = 'https://lectrum.io/intensive/react'
                       rel = 'noreferrer noopener'
                       target = '_blank'>в Лектруме</a>
                </span>
                <div className = 'social'>
                    <a className = 'facebook'
                       href = 'https://www.facebook.com/lectrum/'
                       rel = 'noreferrer noopener'
                       target = '_blank'></a>
                    <a className = 'telegram'
                       href = 'https://t.me/lectrum'
                       rel = 'noreferrer noopener'
                       target = '_blank'></a>
                </div>
            </>
        );

        return <>
            <div className = 'header'>
                <div className = 'logo'/>
                <div className = 'filters'>
                    <div className = { styles.latestFilter }
                         data-name = 'latest'
                         onClick = { this._selectFilter }>
                        <span>Новинки 2018</span>
                    </div>
                    <div className = { styles.upcomingFilter }
                         data-name = 'upcoming'
                         onClick = { this._selectFilter }>
                        <span>Скоро в кинотеатрах</span>
                    </div>
                    <div className = { styles.popularFilter }
                         data-name = 'popular'
                         onClick = { this._selectFilter }>
                        <span>В топ-чартах</span>
                    </div>
                </div>
            </div>
            <div className = 'sorting'>
                <button className = { this.state.selectedSort }
                        onClick = { this._toggleSort }>
                    по новизне
                </button>
            </div>
            <div className = 'content'>{moviesJSX}</div>
            <div className = 'footer'>{myFooter}</div>

        </>
    }
}
