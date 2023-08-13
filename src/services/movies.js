const API_KEY = 'c3b06289'

async function searchMovies({ search }) {
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search

        return movies?.map(movies => ({
            id: movies.imdbID,
            title: movies.Title,
            year: movies.Year,
            poster: movies.Poster
        }))

    } catch (error) {
        throw new Error('Error searching movies')
    }
}

export default searchMovies