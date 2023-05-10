/** @format */

import React from 'react'

const PhoneticAid = ({ aid }) =>
	aid && (
		<sub className='mb-1 flex'>
			{aid.map((e, i) => (
				<span
					key={i}
					className={
						(e === "'") | (e === 'x')
							? 'font-bold text-red-900'
							: 'whitespace-pre text-green-900'
					}
				>
					{e}
				</span>
			))}
		</sub>
	)

const HyperWord = ({
	id = '',
	phAid = '',
	token = {},
	searchTerm = {},
	clickedEl = '',
	handle_click = () => {},
}) => {
	return (
		<div
			className={`mt-2 inline-block 
			`}
		>
			<PhoneticAid aid={phAid} />
			<button
				className={
					clickedEl === id
						? ' font-bold text-red-900 underline'
						: searchTerm.lemma === token.lemma &&
						  searchTerm.PoS === token.partOfSpeech.tag
						? 'text-green-800 underline'
						: 'font-light'
				}
				onClick={() => handle_click(id, token)}
			>
				{token.text.content}
			</button>
		</div>
	)
}

export default HyperWord
