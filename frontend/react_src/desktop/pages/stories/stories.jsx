import React, { useEffect } from 'react'

import use_page_context from '../../../hooks/use_page_context'
import add_paragraphs_and_sentence_index from '../analyze/add_paragraph_and_sentence_index'
import Reader from '../../components/reader/reader'

const StoriesPage = () => {
	const info = use_page_context('bookInfo')
	const phonetics = use_page_context('phonetics')

	const chapters = use_page_context('chapters').map(chapter => {
		const textData = add_paragraphs_and_sentence_index(chapter.textData)
		return {
			chapter: chapter.chapter,
			title: textData.title,
			textData,
		}
	})

	const book = {
		chapters,
		info: {
			id: info.id,
			level: info.level,
			phonetics: phonetics,
			notes: Object.keys(info.notes).length ? info.note : null,
		},
		title: info.title,
	}

	return <Reader book={book && book} />
}

export default StoriesPage
