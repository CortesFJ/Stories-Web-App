import React from 'react'

const Concordance = ({ searchTerm = {}, chapters = [] }) => {
	const sentences = []
	const wordOccurrences = chapters.reduce((acc, chapter) => {
		chapter.textData.tokens.forEach(token => {
			if (
				searchTerm.lemma === token.lemma &&
				searchTerm.partOfSpeech.tag === token.partOfSpeech.tag &&
				!sentences.includes(token.sentenceIndex)
			) {
				sentences.push(token.sentenceIndex)
				const sentence =
					chapter.textData.sentences[token.sentenceIndex].text.content
				const form = token.text.content
				if (!(chapter.title in acc)) {
					acc[chapter.title] = []
				}
				acc[chapter.title].push({ sentence: sentence.split(' '), form })
			}
		})
		return acc
	}, {})

	return (
		<>
			{Object.entries(wordOccurrences).map(([chapter, occurrences], i) => (
				<div key={i}>
					<h5 className='mb-4 pl-0 uppercase text-cyan-700'>{chapter}</h5>
					{occurrences.map((occ, i) => (
						<p
							key={i}
							className='mb-3'
						>
							{occ.sentence.map((word, i) => {
								return (
									<span
										key={i}
										className={
											word.includes(occ.form) ? 'text-cyan-700' : ''
										}
									>
										{' ' + word}
									</span>
								)
							})}
						</p>
					))}
				</div>
			))}
		</>
	)
}

export default Concordance
