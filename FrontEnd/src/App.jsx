import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [data, setData] = useState()

	useEffect(()=>{
	fetch('http://127.0.0.1:8000/apiView')
		.then(e => e.json())
		.then(e => setData(e[0]))
	},[])

	console.log(data);
	return (
		<div className='App'>
			<h1>react app</h1>
			<div>{data?.title}</div>
		</div>
	)
}

export default App
