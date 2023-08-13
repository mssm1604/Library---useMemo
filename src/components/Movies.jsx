function ShowMovies({ movies }) {
    return (
        <ul className="movies">
            {
                movies.map(movie => (
                    <li className="movie" key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResult() {
    return (
        <div style={{ textAlign: 'center' }}>
            <p>No movies found</p>
        </div>
    )
}

function Movies({ foundMovies, search }) {
    const hasMovies = foundMovies?.length > 0

    if (search) {
        return <h3>Look for some movies</h3>
    }

    if (hasMovies) {
        return <ShowMovies movies={foundMovies} />
    } else {
        return <NoMoviesResult />
    }
}


export { Movies }

