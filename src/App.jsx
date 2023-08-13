import './App.css'
import { useEffect, useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import useMovies from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
	const [search, setSearch] = useState('')
	const [error, setError] = useState('')
	const [isFirstInput, setIsFirstInput] = useState(true)

	useEffect(() => {
		if (isFirstInput) {
			setIsFirstInput(search === '')
			return
		}

		if (search === '') {
			setError('No se puede buscar una película vacía')
			return
		}

		if (search.match(/^\d+$/)) {
			setError('No se puede buscar una película con un número')
			return
		}

		if (search.length < 3) {
			setError('La búsqueda debe tener más de 3 letras')
			return
		}

		setError(null)
	}, [search])

	return { search, setSearch, error, isFirstInput }
}

function App() {
	const [sort, setSort] = useState(false)
	const { search, setSearch, error, isFirstInput } = useSearch()
	const { moviesResponse, loading, getMovies } = useMovies({ search, sort })
	const [auxSearch, setAuxSearch] = useState()

	const debouncedGetMovies = useCallback(
		debounce(search => {
			getMovies({ search })
			document.title = `Movies | ${search.toLocaleUpperCase()} `
		}, 350),
		[getMovies]
	)

	const handleSubmit = e => {
		e.preventDefault()
		getMovies({ search })
	}

	const handleSort = () => {
		setSort(!sort)
	}

	const handleChange = e => {
		const newSearch = e.target.value
		if (newSearch.startsWith(' ')) return
		setSearch(newSearch)
		if (error) return null
		debouncedGetMovies(newSearch)
		setAuxSearch(newSearch)
	}

	return (
		<div className="container">
			<header>
				<h1>Buscador de películas</h1>
				<form onSubmit={handleSubmit} className="form">
					<input
						style={{
							border: '1px solid transparent',
							borderColor: error ? 'red' : 'transparent',
						}}
						onChange={handleChange}
						value={search}
						placeholder="Avengers, Stars Wars..."
					/>
					<input
						type="checkbox"
						onChange={handleSort}
						checked={sort}
						disabled={moviesResponse?.length > 0 ? false : true}
					/>
					<button disabled={moviesResponse?.length > 0 ? false : true}>
						Search
					</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>

			<main className="main">
				{loading ? (
					<p>Cargando</p>
				) : (
					<Movies foundMovies={moviesResponse} search={isFirstInput} />
				)}
			</main>
		</div>
	)
}

export default App
