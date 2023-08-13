import searchMovies from '../services/movies'
import { useMemo, useRef, useState, useCallback } from 'react'

function useMovies({ search, sort }) {
    const [moviesResponse, setMoviesResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previosSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search === previosSearch.current) return

        try {
            setLoading(true)
            setError(null)
            previosSearch.current = search
            const movies = await searchMovies({ search })
            setMoviesResponse(movies)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const sortedMovies = useMemo(() => {
        return sort
            ? [...moviesResponse].sort((a, b) => a.title.localeCompare(b.title))
            : moviesResponse
    }, [sort, moviesResponse])

    return { moviesResponse: sortedMovies, getMovies, loading }
}

export default useMovies