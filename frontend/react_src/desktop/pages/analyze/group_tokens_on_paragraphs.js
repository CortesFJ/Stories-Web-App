const group_tokens_on_paragraphs = APIresponse => {
	const paragraphsBegin = []
	const paragraphs = APIresponse.text.split(/\n/)
	let current = 0
	paragraphs.forEach(para => {
		paragraphsBegin.push(current)
		current += para.length + 1
	})

	const sentencesBegin = APIresponse.sentences.map(
		sentence => sentence.text.beginOffset
	)
	const sentences = {}
	sentencesBegin.forEach(poss => (sentences[poss] = []))

	APIresponse.tokens.forEach((token, idx) => {
		token.idx = idx
		sentencesBegin.forEach((sentenceStart, i) => {
			const sentenceEnd = sentencesBegin[i + 1] || Infinity
			const tokenBegin = token.text.beginOffset
			if (tokenBegin >= sentenceStart && tokenBegin < sentenceEnd) {
				sentences[sentenceStart].push({
					sentenceIndex:token.sentenceIndex,
					text: token.text.content,
					lemma: token.lemma,
					PoS: token.partOfSpeech.tag,
				})
			}
		})
	})

	const nestedText = paragraphsBegin.map((paragraphStart, i) => {
		const paragraph = []
		for (const [key, sentence] of Object.entries(sentences)) {
			const sentenceBegin = parseInt(key)
			const paragraphEnd = paragraphsBegin[i + 1] || Infinity
			if (sentenceBegin >= paragraphStart && sentenceBegin < paragraphEnd) {
				paragraph.push(sentence)
			}
		}
		return paragraph
	})

	return nestedText
}

export default group_tokens_on_paragraphs
