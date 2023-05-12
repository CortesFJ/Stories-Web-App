import React from 'react'

import use_page_context from '../../../hooks/use_page_context'
import Reader from '../../components/reader/reader'
import add_paragraphs_and_sentence_index from './add_paragraph_and_sentence_index'

const Analyze = () => {
	const response = use_page_context('response')
	const phonetics = use_page_context('phonetics')
	const textData = add_paragraphs_and_sentence_index(response)

	const book = {
		chapters: [
			{
				chapter: 0,
				title: response.title,
				textData,
			},
		],
		info: {
			id: 0,
			level: undefined,
			phonetics:phonetics,
			notes:null
		},
		title: response.title,
	}

	return <Reader book={book} />
}

export default Analyze
