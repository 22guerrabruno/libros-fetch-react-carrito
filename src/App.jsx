import { useState, useEffect } from 'react'
import logolibreria from './assets/imagenes/logolibreria.png'
import { useDebounce } from 'use-debounce'

import './App.css'

function App() {
	const [books, setBooks] = useState(null)
	const [search, setSearch] = useState(undefined)
	const [debouncedSearch] = useDebounce(search, 1000)
	const [isLoading, setIsLoading] = useState(false)
	const [showCart, setShowCart] = useState(false)

	const [addCart, setAddCart] = useState([])
	const noBookImg = './src/imagenes/Libro-sin-imagen.png'

	const handleSearch = event => {
		event.preventDefault()
		setSearch(event.target.value)
	}
	const handleShowCart = () => {
		if (showCart) {
			setShowCart(false)
		} else {
			setShowCart(true)
		}
	}
	const handleRemoveFromCart = event => {
		let findInCart = addCart.find(book => book.key !== event.target.value)
		let removeFromCart = addCart.filter(book => book.key !== findInCart.key)
		setAddCart(removeFromCart)
	}

	const handleCart = event => {
		console.log(event.target.value)
		let newBook = books.find(book => book.key === event.target.value)
		if (addCart.includes(newBook)) return
		setAddCart([...addCart, newBook])
		console.log(addCart)
	}
	useEffect(() => {
		if (!debouncedSearch) return
		setIsLoading(true)
		fetch(`https://openlibrary.org/search.json?q=${debouncedSearch}`)
			.then(response => response.json())
			.then(data => {
				setBooks(data.docs)
				setIsLoading(false)
			})
	}, [debouncedSearch])

	return (
		<>
			<nav className='header-nav'>
				<form name='search' className='nav-input'>
					<input
						onChange={handleSearch}
						value={search}
						type='text'
						name='search'
						placeholder='Busca aqui tus libros...'
					/>
				</form>
				<img className='logo' src={logolibreria} alt='LOGO LIBRERIA' />
				<div className='header-card-icon-container'>
					{addCart.length > 0 ? (
						<span className='nav-cart'>
							<svg
								onClick={handleShowCart}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1'
								stroke='currentColor'
								className='card-icon'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
								/>
							</svg>
							{addCart.length} Libros
						</span>
					) : (
						<span className='nav-cart'>
							<svg
								onClick={handleShowCart}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1'
								stroke='currentColor'
								className='card-icon'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
								/>
							</svg>
							0 Libros
						</span>
					)}
				</div>
			</nav>
			{showCart && (
				<section className='books-reading-cart-container'>
					<header className='books-reading-cart-header'>
						<h2>LIBROS EN LA LISTA DE LECTURA</h2>
						<p>
							<em>Disfruta y aprende con ellos.</em>
						</p>
					</header>
					<main>
						<ul className='books-reading-cart-list'>
							{addCart?.map(book => (
								<div className='book-reading-cart-item' key={book.key}>
									{book.cover_i === undefined ? (
										<img src={noBookImg} alt={book.title} />
									) : (
										<img
											src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`}
											alt={book.title}
										/>
									)}
									<h3>{book.title}</h3>
									<p>
										<strong>{book.author_name?.[0]}</strong>
									</p>
									<p>{book.publish_date?.[0]}</p>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='remove-icon'
										value={book.key}
										onClick={handleRemoveFromCart}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
										/>
									</svg>
								</div>
							))}
						</ul>
					</main>
				</section>
			)}

			<ul className='books'>
				{isLoading && (
					<div className='loading'>
						<img
							className='loading-icon'
							src={'src/imagenes/loading3.png'}
							alt='loading...'
						/>
					</div>
				)}
				{!isLoading &&
					books?.map((book, idx) => (
						//console.log(book.key, idx),
						<div className='movie' key={book.key}>
							<h3>{book.title}</h3>
							{book.cover_i === undefined ? (
								<img src={noBookImg} alt={book.title} />
							) : (
								<img
									src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`}
									alt={book.title}
								/>
							)}

							<p>
								<strong>{book.author_name?.[0]}</strong>
							</p>
							<p>{book.publish_date?.[0]}</p>
							<button value={book.key} id='addToCart' onClick={handleCart}>
								Agregar al Carrito
							</button>
						</div>
					))}
			</ul>
		</>
	)
}

export default App
// https://openlibrary.org/search.json?q=the+lord+of+the+rings by bookName
// https://openlibrary.org/search/authors.json?q=twain by author
//https://covers.openlibrary.org/b/id/13340334.jpg
// https://openlibrary.org/search.json?q=${search}
/*
	return books?.map(book => ({
			id: book.key,
			cover: book.cover_i,
			published: book.first_publish_year,
			author: book.author_name?.[0],
			title: book.title,
      */
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
// </svg>
