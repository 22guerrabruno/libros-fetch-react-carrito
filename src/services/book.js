export const searchBooks = async ({ search }) => {
	if (search === '') return null

	try {
		const response = await fetch(
			`https://openlibrary.org/search.json?q=${search}`
		)
		const json = await response.json()

		const books = json.docs.seed
		console.log(books)

		return books?.map(book => ({
			id: book.key,
			cover: book.cover_i,
			published: book.first_publish_year,
			author: book.author_name?.[0],
			title: book.title,
		}))
	} catch (error) {
		throw new Error('Erros searching books')
	}
}
