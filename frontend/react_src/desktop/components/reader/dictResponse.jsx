import React, { useState, useRef, useEffect } from 'react'

const DictResponse = ({ searchTerm = {}, setShowDict }) => {
	const [dictData, setDictData] = useState({})
	const [[dir, subDir], setAudioDir] = useState([false, undefined])
	const audioRef = useRef()

	const filter_dictData = (word, wordData) => {
		let data = { translations: {}, audio: '' }

		for (let i = 0; i < wordData.length; i++) {
			let meaning = wordData[i]

			if (typeof meaning !== 'object') {
				break
			}

			if (meaning['hwi']['hw'] !== word) {
				continue
			}
			if (!meaning.hasOwnProperty('fl')) {
				continue
			}

			if (data['audio'] === '') {
				try {
					data['audio'] = meaning['hwi']['prs'][0]['sound']['audio']
				} catch (err) {
					null
				}
			}

			let PoS = meaning['fl']
			if (!data['translations'].hasOwnProperty(PoS)) {
				data['translations'][PoS] = []
			}
			const translations = []
			const shortDef = meaning['shortdef']
			const translation = shortDef.map(def =>
				def.includes(':') ? def.split(':')[1].trim() : def
			)
			translations.push(...translation)
			data['translations'][PoS] = [...new Set(translations)]
		}

		return data
	}

	useEffect(() => {
		if (Object.keys(searchTerm).length) {
			fetch(`/dictData/?word=${searchTerm.lemma}`)
				.then(response =>
					response.status == 200
						? response.json()
						: // manage error properly
						  { message: 'hubó un problema para procesar la solicitud' }
				)
				.then(r => {
					const data = filter_dictData(searchTerm.lemma, r.data)
					const dir = data.audio
					const subDir = dir.startsWith('bix')
						? 'bix'
						: dir.startsWith('gg')
						? 'gg'
						: /^[^a-zA-Z]/.test(dir)
						? 'number'
						: dir[0]

					setDictData(data)
					setAudioDir([dir, subDir])
				})
		}
	}, [])

	return (
		<div className=' absolute z-[1] max-h-80 w-max overflow-y-auto translate-y-12 rounded-md border bg-white p-6 shadow-md'>
			<div className='sticky top-0 mb-6 flex justify-between gap-6'>
				<h5 className='capitalize'>{searchTerm.lemma}</h5>
				<div className='flex items-center justify-end gap-2 text-white'>
					{dir && (
						<>
							<audio
								ref={audioRef}
								src={`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDir}/${dir}.mp3`}
								autoPlay
								type='audio/mpeg'
							></audio>
							<button onClick={() => audioRef.current.play()}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={4}
									stroke='currentColor'
									className='h-5 w-5 rounded-full bg-green-900 p-1.5 shadow-green-900 hover:bg-green-700 active:bg-black'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
									/>
								</svg>
							</button>
						</>
					)}
					<button onClick={() => setShowDict(false)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={4}
							stroke='currentColor'
							className='h-5 w-5 rounded-full bg-red-900 p-1.5 shadow-green-900 hover:bg-red-700 active:bg-black'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
			{Object.keys(dictData).length ? (
				Object.keys(dictData?.translations)?.map((PoS, i) => (
					<div
						key={i}
						className='mb-4 capitalize'
					>
						<h6 className='text-lg  text-cyan-700 opacity-80'>{PoS}</h6>
						{dictData?.translations[PoS].map((meaning, i) => (
							<p key={i}>{meaning}</p>
						))}
					</div>
				))
			) : (
				<div>searching...</div>
			)}
		</div>
	)
}

export default DictResponse
