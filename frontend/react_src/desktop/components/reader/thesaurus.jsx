import React, { useEffect, useRef, useState } from 'react'

import Analyze from './analyze'
import Concordance from './concordance'
import DictResponse from './dictResponse'

const Thesaurus = ({
	searchTerm = {},
	textData = [],
	mode = '',
	book = {},
	setMode = () => {},
}) => {
	const chapters = book.chapters
	const notes = book.info.notes

	const Notes = ({ notes }) => (
		<div className='capitalize'>
			{notes &&
				Object.keys(notes)
					.sort()
					.map((title, i) => (
						<div
							className=' mb-2'
							key={i}
						>
							<span className='font-semibold text-neutral-600'>
								{title}:{' '}
							</span>
							{notes[title].map((note, i) => (
								<span key={i}> {note} </span>
							))}
						</div>
					))}
		</div>
	)

	const SearchHeader = () => {
		if (!searchTerm.text) {
			return <div>Selecciona una palabra del texto para ver ayudas aquí</div>
		}
		const [showDict, setShowDict] = useState(false)
		const word = searchTerm.text.content
		const lemma = searchTerm.lemma

		const get_phonetic = phonetics =>
			typeof phonetics === 'object'
				? phonetics[Object.keys(phonetics)[0]] // Pendiente elegir la transcripcion adecuada
				: phonetics

		return (
			<header className='mb-12 flex justify-between gap-12'>
				<h4 className='flex flex-wrap items-center gap-5'>
					<span className='capitalize'>{word}</span>
					<small className='opacity-80'>
						{' '}
						/ {get_phonetic(textData.phoneticDict[word])} /
					</small>
				</h4>
				<button
					className='flex items-center gap-1 capitalize'
					onClick={() => setShowDict(!showDict)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className='h-14 w-14 rounded-full border border-neutral-800 bg-neutral-800 p-3 text-white shadow-md hover:bg-white hover:text-neutral-800'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
						/>
					</svg>
					{lemma != word ? lemma : ''}
				</button>
				{showDict ? (
					<DictResponse
						searchTerm={searchTerm}
						setShowDict={setShowDict}
					/>
				) : (
					''
				)}
			</header>
		)
	}

	return (
		<aside className=' col-span-3 border-l-2 pl-3'>
			<nav className='flex h-16 items-center justify-between border-b border-teal-800 p-8 p-2 text-xl '>
				<div className='flex justify-end gap-4'>
					<button
						className={mode == 'concordance' ? 'font-bold' : ''}
						onClick={() => setMode('concordance')}
					>
						Ocurrencias
					</button>
					<button
						className={mode == 'analyze' ? 'font-bold' : ''}
						onClick={() => setMode('analyze')}
					>
						Analizar en contexto
					</button>
					{notes && (
						<button
							className={mode == 'notes' ? 'font-bold' : ''}
							onClick={() => setMode('notes')}
						>
							Notes
						</button>
					)}
				</div>
			</nav>
			<div
				className='hypertext overflow-auto p-6'
			>
				{mode == 'notes' ? (
					<Notes notes={notes} />
				) : (
					<>
						<SearchHeader />
						{
							{
								concordance: (
									<Concordance
										searchTerm={searchTerm}
										chapters={chapters}
									/>
								),
								analyze: (
									<Analyze
										searchTerm={searchTerm}
										textData={textData}
									/>
								),
							}[mode]
						}
					</>
				)}
			</div>
		</aside>
	)
}

export default Thesaurus
