import React, { useState, createContext, useEffect } from 'react'

import HyperText from './hypertext'
import Thesaurus from './thesaurus'
import { LeftArrow, RightArrow } from '../arrows'

const Reader = ({ book = {} }) => {
	const [chapter, setChapter] = useState(0)
	const [text, setText] = useState(book.chapters[0])
	const [searchTerm, setSearchTerm] = useState()
	const [searchMode, setSearchMode] = useState('analyze')
	const [clickedEl, setClickedEl] = useState(null)

	// useEffect(() => {
	// 	handle_click(8, {
	// 		sentenceIndex: 0,
	// 		idx: 8,
	// 		text: {
	// 			content: 'village',
	// 			beginOffset: 29,
	// 		},
	// 		partOfSpeech: {
	// 			tag: 6,
	// 			number: 1,
	// 			aspect: 0,
	// 			case: 0,
	// 			form: 0,
	// 			gender: 0,
	// 			mood: 0,
	// 			person: 0,
	// 			proper: 0,
	// 			reciprocity: 0,
	// 			tense: 0,
	// 			voice: 0,
	// 		},
	// 		dependencyEdge: {
	// 			headTokenIndex: 5,
	// 			label: 36,
	// 		},
	// 		lemma: 'village',
	// 	})
	// }, [])

	const handle_click = (indexOfToken, token) => {
		const wordData = {
			lemma: token.lemma,
			PoS: token.partOfSpeech.tag,
			sentenceIndex: token.sentenceIndex,
			token,
			indexOfToken,
		}
		if (searchTerm?.indexOfToken === wordData.indexOfToken) {
			return
		}
		setClickedEl(indexOfToken)
		setSearchTerm(wordData)
		setSearchMode('concordance')
	}

	const change_chapter = (change, to) => {
		if (to) {
			setText(book.chapters[to])
			setChapter(to)
			return
		}
		const newChapter = parseInt(chapter) + change
		if ((newChapter < 0) | (newChapter >= book.chapters.length)) {
			return
		}

		// setSearchTerm({ lemma: null, clickedEl: null })
		setText(book.chapters[newChapter])
		setChapter(newChapter)
	}

	const ChaptersNavbar = ({ chapters = [], change_chapter = () => {} }) => (
		<nav className='flex h-16 w-full items-center justify-between border-b border-teal-800 p-8'>
			{chapters.length > 1 ? (
				<>
					<select
						className='translate-y-0.5 bg-transparent pr-2 text-2xl font-bold uppercase text-neutral-600 hover:text-neutral-700'
						// defaultValue={chapter.title}
						onChange={e => change_chapter('_', e.target.value)}
					>
						{chapters.map((chapter, i) => (
							<option
								key={i}
								value={i}
							>
								{chapter.title}
							</option>
						))}
					</select>
					<span className='flex items-center gap-2'>
						<LeftArrow
							onClick={() => change_chapter(-1)}
							style='w-7 h-7 text-neutral-600 hover:text-neutral-800 active:text-green-900'
						/>
						<RightArrow
							onClick={() => change_chapter(1)}
							style='w-7 h-7 text-neutral-600 hover:text-neutral-800 active:text-green-900'
						/>
					</span>
				</>
			) : (
				<div className='translate-y-0.5 bg-transparent pr-2 text-2xl font-bold uppercase text-neutral-600 hover:text-neutral-700'>
					{chapters[0].title}
				</div>
			)}
		</nav>
	)

	return (
		<div className='grid grid-cols-7 gap-7 px-24 text-lg'>
			<div className='col-span-4'>
				<ChaptersNavbar
					chapters={book.chapters}
					change_chapter={change_chapter}
				/>
				<HyperText
					tokens={text.textData.tokens}
					beginOfParagraphs={text.textData.beginOfParagraphs}
					handle_click={handle_click}
					searchTerm={searchTerm}
					clickedEl={clickedEl}
				/>
			</div>
			<Thesaurus
				searchTerm={searchTerm?.token}
				mode={searchMode}
				setMode={setSearchMode}
				textData={text.textData}
				book={book && book}
			/>
		</div>
	)
}

export default Reader
