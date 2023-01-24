/** @format */

import React, { useEffect, useRef, useState } from 'react'

const Concordance = ({ wordId = '', chapters = [] }) => {
	const get_word = elm => (Array.isArray(elm) ? elm[0] : elm)

	return (
		<>
			{chapters.reduce((acc, text, i) => {
				const wordMap = text['wordsMap'][wordId]
				wordMap &&
					acc.push(
						<div key={i}>
							<h6 className="mb-3 pl-0 text-right uppercase text-cyan-700">{text.title}</h6>
							{wordMap.map((loc, i) => {
								const [paragraph, sentence, word] = loc.split('_').map(i => parseInt(i))
								const snt = text['nestedText'][paragraph][sentence]
								return (
									<div
										key={i}
										className="mb-2">
										{snt.slice(0, word).map(e => get_word(e))}
										<span className="text-cyan-700">{snt[word][0]}</span>
										{snt.slice(word + 1, snt.length).map(e => get_word(e))}
									</div>
								)
							})}
						</div>
					)
				return acc
			}, [])}
		</>
	)
}

const DictResponse = ({ translations = {} }) => {
	return (
		<div>
			{Object.keys(translations)?.map((PoS, i) => (
				<div key={i} className="capitalize">
					<h6 className=" mt-4 text-sm  text-cyan-700 opacity-80">{PoS}</h6>
					{translations[PoS].map((meaning, i) =>
						meaning.map((Def, i) => {
							if (Def.includes(':')) {
								const [en, es] = Def.split(':')
								return (
									<p key={i}>
										<strong>{en}: </strong>
										<span>{es}</span>
									</p>
								)
							} else {
								return <p key={i}> {Def} </p>
							}
						})
					)}
				</div>
			))}
		</div>
	)
}

const Thesaurus = ({
	searchTerm = {},
	chapters = [],
	mode = '',
	setMode = () => {},
	translations = {},
	dictData = {},
}) => {
	const audioRef = useRef()

	const Notes = () => (
		<div className="capitalize">
			{translations &&
				Object.keys(translations)
					.sort()
					.map((word, i) => (
						<div
							className=" mb-2"
							key={i}>
							<span className="font-semibold text-neutral-600">{word}: </span>
							{translations[word].map((t, i) => (
								<span key={i}> {t} </span>
							))}
						</div>
					))}
		</div>
	)

	const SearchHeader = () => {
		if (!Object.keys(searchTerm).length) {
			return <div>Selecciona una palabra del texto para ver ayudas aquí</div>
		}

		const dir = dictData[searchTerm.lemma].audio
		const subDir = dir.startsWith('bix')
			? 'bix'
			: dir.startsWith('gg')
			? 'gg'
			: /^[^a-zA-Z]/.test(dir)
			? 'number'
			: dir[0]

		return (
			<header className="mb-8 flex items-center gap-12">
				<h4 className="capitalize ">{searchTerm.lemma}</h4>
				{dir && (
					<>
						<audio
							ref={audioRef}
							src={`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDir}/${dir}.mp3`}
							autoPlay
							type="audio/mpeg"></audio>
						<button onClick={() => audioRef.current.play()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-7 w-7 rounded-full hover:text-black active:bg-teal-900 active:text-neutral-100 ">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
								/>
							</svg>
						</button>
					</>
				)}
			</header>
		)
	}

	return (
		<aside className=" col-span-3">
			<nav className="flex h-16 items-center justify-between border-b border-teal-800 p-2 text-xl ">
				<div className="flex justify-end gap-4">
					<button
						className={mode == 'concordance' ? 'font-bold' : ''}
						onClick={() => setMode('concordance')}>
						Historial
					</button>
					<button
						className={mode == 'dict' ? 'font-bold' : ''}
						onClick={() => setMode('dict')}>
						Diccionario
					</button>
					<button
						className={mode == 'notes' ? 'font-bold' : ''}
						onClick={() => setMode('notes')}>
						Notas
					</button>
				</div>
			</nav>
			<div className="hypertext">
				{
					{
						dict: (
							<>
								<SearchHeader />
								<DictResponse translations={dictData[searchTerm.lemma]?.translations} />
							</>
						),
						concordance: (
							<>
								<SearchHeader />
								<Concordance
									wordId={searchTerm.wordId}
									chapters={chapters}
								/>
							</>
						),
						notes: <Notes translations={translations} />,
					}[mode]
				}
			</div>
		</aside>
	)
}

export default Thesaurus
