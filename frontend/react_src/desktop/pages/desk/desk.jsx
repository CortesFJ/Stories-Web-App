/** @format */

import React, { useState, useEffect } from 'react'

import TextBook from './TextBook'
import LexiconHelp from './LexiconHelp'
import use_page_context from '../../../hooks/use_page_context'
import fetch_api from '../../../hooks/fetch_api'

const Desk = () => {
	const existingTexts = use_page_context('texts')
	const levelsLexicon = use_page_context('levelsLexicon')
	const [book, setBook] = useState('')
	const [bookLevel, setBookLevel] = useState(1)
	const [chapter, setChapter] = useState(1)
	const [text, setText] = useState('')
	const [title, setTitle] = useState('')
	const [lexicon, setLexicon] = useState({})

	useEffect(() => {
		set_level_lexicon(1)
	}, [])

	const save_text = async () => {
		if (book in existingTexts) {
			if (chapter in existingTexts[book]) {
				alert(
					`Datos invalidos. Ya existe un capitulo # ${chapter} en el libro ${book}`
				)
				return
			}
			if (Object.values(existingTexts[book]).includes(title)) {
				alert(
					`Datos invalidos. Ya existe un texto con titlulo ${title} en el libro ${book}`
				)
				return
			}
		}

		fetch_api({
			data: {
				book,
				text,
				title,
				chapter,
				bookLevel,
			},
		}).then(window.location.href = '/textUpdated/')
	}

	const set_level_lexicon = level => {
		level = parseInt(level)
		const range = [...Array(level).keys()]

		const lexicon = range.reduce(
			(acc, id) => {
				const { PoS, words } = levelsLexicon[id]
				acc.words = [...new Set([...acc.words, ...words])]

				Object.keys(PoS).map(key => {
					if (key in acc.PoS) {
						acc.PoS[key] = [...new Set([...acc.PoS[key], ...PoS[key]])]
					} else {
						acc.PoS[key] = PoS[key]
					}
				})

				return acc
			},
			{ PoS: {}, words: [] }
		)
		setLexicon(lexicon)
		setBookLevel(level)
	}

	return (
		<div className='grid grid-cols-5 gap-6 px-12'>
			<TextBook
				text={text}
				setText={setText}
				lexicon={lexicon?.words}
			/>
			<div className='col-span-2'>
				<div className='mb-3 grid h-40 rounded-lg border border-neutral-400 p-4 shadow-lg'>
					<header className='grid w-full gap-1'>
						<input
							type='text'
							placeholder='Book Title'
							className='w-full rounded border bg-neutral-100 py-1.5 pl-2 capitalize shadow-inner outline-none'
							onInput={e => setBook(e.target.value.trim().toLowerCase())}
						/>
						<input
							type='text'
							placeholder='Chapter Title'
							className='w-full rounded border bg-neutral-100 py-1.5 pl-2 capitalize shadow-inner outline-none'
							onInput={e => setTitle(e.target.value.trim().toLowerCase())}
						/>
						<div className='flex items-center justify-between py-1 pl-2'>
							<div className='flex gap-4'>
								<div className='flex gap-2'>
									Chapter
									<select
										name='lexiconLevel'
										defaultValue='1'
										className='rounded border bg-neutral-100 p-1 shadow-inner'
										onChange={e => setChapter(e.target.value)}
									>
										{[...Array(5).keys()].map(k => (
											<option
												key={k}
												value={k + 1}
											>
												{k + 1}
											</option>
										))}
									</select>
								</div>
								<div className='flex gap-2'>
									Level
									<select
										name='lexiconLevel'
										defaultValue='1'
										className='rounded border bg-neutral-100 p-1 shadow-inner'
										onChange={e => set_level_lexicon(e.target.value)}
									>
										{[...Array(5).keys()].map(k => (
											<option
												key={k}
												value={k + 1}
											>
												{k + 1}
											</option>
										))}
									</select>
								</div>
							</div>
							<button
								className='rounded bg-neutral-400 px-6 py-1 hover:bg-neutral-500 active:text-white'
								onClick={() => save_text()}
							>
								Save
							</button>
						</div>
					</header>
				</div>
				<LexiconHelp lexicon={lexicon.PoS} />
			</div>
		</div>
	)
}

export default Desk
