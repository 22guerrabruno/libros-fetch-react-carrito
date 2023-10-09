export const ListofBooks = ({ books }) => {
	return (
		<ul className='movies'>
			{books.map(book => (
				<li className='movie' key={book.id}>
					<h3>{book.title}</h3>
					<h4>{book.author}</h4>
					<h5>{book.published}</h5>
					<p>{book.year}</p>
					<img src={book.image} alt={book.title} />
				</li>
			))}
		</ul>
	)
}
