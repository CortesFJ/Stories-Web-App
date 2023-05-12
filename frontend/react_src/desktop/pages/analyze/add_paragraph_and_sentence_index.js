const add_paragraphs_and_sentence_index = APIresponse => {
	const beginOfParagraphs = []
	const paragraphs = APIresponse.text.split(/\n/)
	let current = 0
	paragraphs.forEach(para => {
		beginOfParagraphs.push(current)
		current += para.length + 1
	})

	const beginOfSentences = APIresponse.sentences.map(
		sentence => sentence.text.beginOffset
	)

	APIresponse.beginOfParagraphs = beginOfParagraphs

	APIresponse.sentences.forEach(sentence => {
		beginOfParagraphs.forEach((paragraphStart, i) => {
			const paragraphEnd = beginOfParagraphs[i + 1] || Infinity
			const sentenceBegin = sentence.text.beginOffset

			if (sentenceBegin >= paragraphStart && sentenceBegin < paragraphEnd) {
				sentence.paragraphIndex = i
			}
		})
	})

	APIresponse.tokens.forEach((token, idx) => {
		beginOfSentences.forEach((sentenceStart, i) => {
            const sentenceEnd = beginOfSentences[i+1] || Infinity
            const tokenBegin = token.text.beginOffset

			if (tokenBegin >= sentenceStart && tokenBegin < sentenceEnd) {
				token.sentenceIndex = i
				token.idx = idx
			}
        })
	})

	return APIresponse
}

export default add_paragraphs_and_sentence_index
