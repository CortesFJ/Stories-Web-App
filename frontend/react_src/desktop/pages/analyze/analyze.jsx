import React, { useState, useEffect, useRef } from 'react'

import use_page_context from '../../../hooks/use_page_context'
import Reader from '../../components/reader/reader'

import * as d3 from 'd3'

const SentenceVisualizer = ({ sentence, dependencyEdges }) => {
	const svgRef = useRef(null)

	useEffect(() => {
		const svg = d3.select(svgRef.current)

		// Create a circle for each word in the sentence
		const circles = svg
			.selectAll('circle')
			.data(sentence.split(' '))
			.enter()
			.append('circle')
			.attr('r', 10)
			.attr('cx', (d, i) => 50 + i * 50)
			.attr('cy', 50)
			.attr('fill', 'steelblue')

		// Create a line or arc for each dependency edge
		const edges = svg
			.selectAll('line')
			.data(dependencyEdges)
			.enter()
			.append('line')
			.attr('x1', d => 50 + d.headTokenIndex * 50)
			.attr('y1', 50)
			.attr('x2', d => 50 + d.dependentTokenIndex * 50)
			.attr('y2', 50)
			.attr('stroke', 'black')
			.attr('stroke-width', 2)

		// Add the sentence text as a label in the center of the container
		svg.append('text')
			.attr('x', '50%')
			.attr('y', 100)
			.attr('text-anchor', 'middle')
			.text(sentence)
	}, [sentence, dependencyEdges])

	return (
		<svg
			ref={svgRef}
			width='500'
			height='150'
		></svg>
	)
}

const Analyze = () => {
	const response = use_page_context('response')
	console.log(response)





	// const sentence = 'this is an example sentence designed to serve as test'
	// const dependencyEdges = []
	// const tokens = response.tokens

	// tokens.forEach(token => {
	// 	const depEdge = token.dependencyEdge
	// 	if (depEdge) {
	// 		dependencyEdges.push(depEdge)
	// 	}
	// })

	return (
		<>
			{/* <SentenceVisualizer
			sentence={sentence}
		 	dependencyEdges={dependencyEdges}
		 /> */}
		 <Reader/>
		</>
	)
}

export default Analyze
