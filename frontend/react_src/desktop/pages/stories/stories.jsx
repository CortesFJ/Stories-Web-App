import React, { useEffect } from 'react'
import use_page_context from '../../../hooks/use_page_context'

import Reader from '../../components/reader/reader'

const StoriesPage = () => {
	// useEffect(() => {
	const book = {
		info: use_page_context('bookInfo'),
		chapters: use_page_context('chapters'),
	}
	// setBook(cur_book)
	// setText(cur_book.chapters[0])
	// }, [])
	console.log(book);

	return <Reader book={book} />
}

export default StoriesPage
