/** @format */

import React from 'react'

import HyperWord from '../hyperWord'

const HyperText = ({
	tokens = [],
	beginOfParagraphs = [],
	// lexicon = [],
	searchTerm = {},
	clickedEl = '',
	handle_click = () => {},
}) => {
	const reductions = [
		"'s",
		"n't",
		"'re",
		"'m",
		"'ve",
		"'d",
		"'t",
		"'ll",
		"'clock",
		'’s',
		'n’t',
		'’re',
		'’m',
		'’ve',
		'’d',
		'’t',
		'’ll',
		'’clock',
	]
	const Words = ({ tokens }) =>
		tokens.reduce((acc, token, i) => {
			if (token.partOfSpeech.tag == 10) {
				acc.push(token.text.content)
				return acc
			}

			if (
				token.text.beginOffset &&
				beginOfParagraphs.includes(token.text.beginOffset)
			) {
				acc.push(
					<div key={'s' + i}>
						<br />
						{/* <sup className='m-1 font-semibold text-purple-900 '>{i}</sup> */}
					</div>
				)
			}

			!reductions.some(abbr => token.text.content === abbr) && acc.push(' ')

			// const phAid = lemmaId ? lexicon[lemmaId].phAid : null
			acc.push(
				<HyperWord
					key={'w' + i}
					id={i}
					token={token}
					// phAid={phAid}
					searchTerm={searchTerm}
					clickedEl={clickedEl}
					handle_click={handle_click}
				/>
			)

			return acc
		}, [])

	return (
		<div className='hypertext overflow-auto p-6 text-justify'>
			<Words tokens={tokens} />
		</div>
	)
}

export default HyperText
