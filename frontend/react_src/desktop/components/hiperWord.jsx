/** @format */

import React from 'react'

const PhoneticAid = ({ aid }) =>
	aid && (
		<sub className='flex mb-1'>
			{aid.map((e, i) => (
				<span
					key={i}
					className={(e === "'") | (e === 'x') ? 'font-bold text-red-900' : 'whitespace-pre text-green-900'}>
					{e}
				</span>
			))}
		</sub>
	)

const HiperWord = ({ id = '', word = '', lemmaId = '', phAid = '', searchTerm = {}, handle_click = () => { } }) => {
	return (
		<div
			id={id}
			className={`inline-block mt-2 ${word == "n't" ? '' : 'ml-0.5'}`}>
			<PhoneticAid aid={phAid} />
			<button
				className={` ${searchTerm.clickedEl === id
						? ' text-teal-800 font-bold'
						: searchTerm.wordId === lemmaId
							? 'text-cyan-600'
							: 'font-light'
					}`}
				onClick={() => handle_click(id, lemmaId)}>
				{word}
			</button>
		</div>
	)
}

export default HiperWord
