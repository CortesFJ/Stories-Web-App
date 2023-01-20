/** @format */

import React, { useEffect, useState } from 'react'

const Concordance = ({ wordId = '', chapters = [] }) => {

	const get_word = elm => (Array.isArray(elm) ? elm[0] : elm)

	return (
		<>
			{chapters.reduce((acc, text, i) => {

				const wordMap = text['wordsMap'][wordId]
				wordMap &&
					acc.push(
						<div key={i}>
							<h6 className='pl-0 mb-3 text-right text-cyan-700 uppercase'>{text.title}</h6>
							{
								wordMap.map((loc, i) => {
									const [paragraph, sentence, word] = loc.split('_').map(i => parseInt(i))
									const snt = text['nestedText'][paragraph][sentence]
									return (
										<div
											key={i}
											className='mb-2'>
											{snt.slice(0, word).map(e => get_word(e))}
											<span className='text-cyan-700'>{snt[word][0]}</span>
											{snt.slice(word + 1, snt.length).map(e => get_word(e))}
										</div>
									)
								})
							}
						</div>
					)
				return acc
			}, [])}
		</>
	)
}

const DictResponse = ({ word = '' }) => {

	const [data, setData] = useState()

	async function fetch_word(word) {
		const apiKey = '18daa199-2a7d-4c78-8a0d-732dda4dd277'
		const url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${apiKey}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			return data
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetch_word(word)
			.then(data => {
				setData(data.reduce((acc, entry) => {
					console.log({ word, entry });
					entry.hwi.hw == word && acc.push(entry)
					return acc
				}, []))
			})
	}, [])

	// data && console.log(data)
	return (
		<div>
			{data?.map((meaning, i) => (
				<ul
					key={i}>
					{meaning.shortdef.map((entry, i) => {
						if (entry.includes(':')) {
							const [en, es] = entry.split(':')
							return (
								<li
									className='p-2'
									key={i}>
									<h6 className=' opacity-80 text-cyan-700 text-sm capitalize mt-4'>{meaning.fl}</h6>
									<p>
										<strong className='capitalize'>{en}: </strong>
										<span>{es}</span>
									</p>
								</li>
							)
						}
						return (
							<li
								className='p-2'
								key={i}>
								<h6 className=' opacity-80 text-cyan-700 text-sm capitalize mt-4'>{meaning.fl}</h6>
								<p> {entry} </p>
							</li>
						)
					})}
				</ul>
			))}
		</div>
	)

}

const Thesaurus = ({ searchTerm = {}, chapters = [], mode = '', setMode = () => { }, translations = {} }) => {

	const Notes = () => (
		<div className='capitalize'>
			{translations && Object.keys(translations)
				.sort()
				.map((word, i) => (
					<div className=' mb-2' key={i}>
						<span className='text-neutral-600 font-semibold'>{word}: </span>
						{translations[word].map((t, i) => (
							<span key={i}> {t} </span>
						))}
					</div>
				))
			}
		</div>
	)

	const SearchHeader = () => (
		<header className='flex items-baseline gap-4 mb-8'>
			<h4 className='capitalize '>{searchTerm.lemma}</h4>
			{/* <span>{ipa}</span> */}
		</header>
	)

	return (
		<aside className=' col-span-3'>
			<nav className='flex items-center justify-between border-b text-xl border-teal-800 h-16 p-2 '>
				<div className='flex justify-end gap-4'>
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
			<div className='hypertext'>
				{{
					dict:
						<>
							<SearchHeader />
							<DictResponse word={searchTerm.lemma} />
						</>
					,
					concordance:
						<>
							<SearchHeader />
							<Concordance
								wordId={searchTerm.wordId}
								chapters={chapters}
							/>
						</>
					,
					notes: <Notes translations={translations} />
				}[mode]}
			</div>
		</aside>
	)
}

export default Thesaurus
