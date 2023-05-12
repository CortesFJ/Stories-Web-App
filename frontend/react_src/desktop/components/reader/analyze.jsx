import React, { useEffect, useRef, useState } from 'react'
import googleTags from '../../../../static/json/googleCloudTags'

const Analyze = ({ textData = {}, searchTerm = {} }) => {
	if (!Object.keys(searchTerm).length) {
		return
	}

	const headToken = textData.tokens[searchTerm.dependencyEdge.headTokenIndex]
	const sentence = textData.sentences[searchTerm.sentenceIndex].text.content
	const [IAresponse, setIAresponse] = useState(null)
	const searchTermFeatures = Object.keys(searchTerm.partOfSpeech).reduce(
		(acc, feature) => {
			if (feature != 'tag' && searchTerm.partOfSpeech[feature] != 0) {
				const index = searchTerm.partOfSpeech[feature]
				const featureDescription = googleTags[feature][index].description
				acc[feature] = featureDescription
			}
			return acc
		},
		{}
	)

	const find_phrases = (token, acc) => {
		textData.tokens.forEach(t => {
			if (t.dependencyEdge.headTokenIndex != token.idx) {
				return
			}
			acc.push(t)
			acc = find_phrases(t, acc)
		})
		return acc
	}


	const dependedTokens = textData.tokens.filter(
		(t, idx) => idx != searchTerm.idx && t.dependencyEdge.headTokenIndex === searchTerm.idx
	)

	const dependedPhrases = dependedTokens.map(token => {
		const tokensOfPhrase = find_phrases(token, [token]).sort((t1, t2) =>
			t1.idx > t2.idx ? 1 : -1
		)
		const beginOfPhrase = tokensOfPhrase[0].idx
		const tokensIds = []

		let phrase = { tokens: tokensOfPhrase, text: '' }

		let index
		tokensOfPhrase.forEach(token => {
			if (index === undefined || index == token.idx) {
				if (token.partOfSpeech.tag == 10 || token.text.content.includes("'")) {
					phrase.text += token.text.content
				} else {
					phrase.text += ' ' + token.text.content
				}

				index = token.idx + 1
			} else {
				phrase.text += ' ... ' + token.text.content
				index = undefined
			}
			tokensIds.push(token.idx)
		})

		return { nucleus: token, tokensIds, phrase, beginOfPhrase }
	})

	const word = searchTerm.text.content
	const lemma = word == searchTerm.lemma ? '' : searchTerm.lemma
	const featuresStr = Object.keys(searchTermFeatures)
		.map(f => searchTermFeatures[f])
		.join(', ')
	const complements = dependedPhrases.reduce((acc, phrase) => {
		const text = phrase.phrase.text
		if (
			phrase.phrase.tokens.length === 1 &&
			phrase.phrase.tokens[0].partOfSpeech.tag === 10
		) {
			acc[acc.length - 1] += text
			return acc
		}
		acc.push(text)
		return acc
	}, [])
	const grammarFunctionStr =
		googleTags.label[searchTerm.dependencyEdge.label].description

	const prompt = `Word: ${word}${lemma && ', form of: ' + lemma}${
		featuresStr && `(${featuresStr})`
	}
${'Sentence: ' + sentence}${
		complements.length
			? `\nComplements:\n${complements.map(c => c.text).join(' \n')}`
			: ''
	} ${
		grammarFunctionStr != 'Root' &&
		`\nFunction: ${grammarFunctionStr} of '${headToken?.text.content}`
	}`

	const fetch_IAtool = prompt => {
		if (IAresponse == null && Object.keys(searchTerm).length) {
			setIAresponse('asking')
			fetch(`/IAresponse/?prompt=${prompt}`)
				.then(response =>
					response.status == 200
						? response.json()
						: // manage error properly
						  { message: 'hubó un problema para procesar la solicitud' }
				)
				.then(r => {
					setIAresponse(r.data)
				})
		}
	}

	const IAanalyzer = ({ IAresponse }) => {
		const sectionRef = useRef(null)

		useEffect(() => {
			if (sectionRef.current) {
				const parent = sectionRef.current.parentNode
				parent.scrollTo({
					behavior: 'smooth',
					top: parent.scrollHeight - sectionRef.current.scrollHeight,
				})
			}
		}, [])

		return (
			<section
				ref={sectionRef}
				className='pt-6'
			>
				<br />
				{IAresponse ? (
					IAresponse.split(/(?:\r?\n)+/).map((paragraph, i) => (
						<div key={i}>
							<p className='h-full'>{paragraph}</p>
							<br />
						</div>
					))
				) : (
					<h4>analyzing...</h4>
				)}
			</section>
		)
	}

	const sentenceTokens = textData.tokens.filter(
		t => t.sentenceIndex == searchTerm.sentenceIndex
	)
	const allDependedTokens = dependedPhrases.reduce((acc, phrase) => {
		return [...acc, ...phrase.tokensIds]
	}, [])

	const allTokensOfPhraseIds = [...allDependedTokens, searchTerm.idx].sort((a, b) =>
		a > b ? 1 : -1
	)

	const tokenToString = token => {
		if (token.partOfSpeech.tag == 10) {
			return token.text.content
		}
		return ' ' + token.text.content
	}

	const strPhrase = allTokensOfPhraseIds
		.reduce(
			(acc, tId) => {

				const tContent = tokenToString(textData.tokens[tId])
				if (acc.prevId === null || acc.prevId === tId - 1) {
					acc.phrase += tContent
				} else {
					acc.phrase += ` ...	${tContent}`
				}
				acc.prevId = tId
				return acc
			},
			{ phrase: '', prevId: null }
		)
		.phrase.trim()

	const searchTermIsRoot = grammarFunctionStr === 'Root'
	const Sentence = () => (
		<p>
			{sentenceTokens.map((t, i) => {
				if (t.partOfSpeech.tag == 10) {
					return <span key={i}>{t.text.content}</span>
				}
				const style =
					t.idx === searchTerm.idx
						? 'text-black text-xl'
						: allDependedTokens.includes(t.idx)
						? !searchTermIsRoot
							? 'underline'
							: ''
						: ' opacity-80'
				return (
					<span
						key={i}
						className={style}
					>
						{' '}
						{t.text.content}
					</span>
				)
			})}
		</p>
	)

	return (
		<>
			<h5>Oración</h5>
			<br />
			<Sentence />
			<br />
			{complements.length > 0 && (
				<div className='flex'>
					<strong className='grid items-center capitalize'>{word}</strong>
					<div className='ml-4 mr-2 grid items-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='h-6 w-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
							/>
						</svg>
					</div>
					<ul className='grid items-center'>
						{complements.map((text, i) => (
							<li
								key={i}
								className=' list-inside list-disc'
							>
								{text}
							</li>
						))}
					</ul>
				</div>
			)}
			<br />
			{!searchTermIsRoot && (
				<p className='flex items-center'>
					<strong className='capitalize'>{headToken?.text.content}</strong>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className='ml-4 mr-2 h-6 w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
						/>
					</svg>
					( {strPhrase} )
				</p>
			)}
			<br />
			{!IAresponse ? (
				<button
					className='mb-10 rounded border border-neutral-800 py-1 px-4 shadow hover:bg-neutral-800  hover:text-white active:bg-green-900'
					onClick={() => fetch_IAtool(prompt)}
				>
					Explicame
				</button>
			) : IAresponse === 'asking' ? (
				<h5>Analizando texto ... (tardará unos segundos)</h5>
			) : (
				<IAanalyzer IAresponse={IAresponse} />
			)}
		</>
	)
}
export default Analyze
