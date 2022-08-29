import React from 'react'
import './App.css'
import { Router } from './Router/Router'
import { OneTwo } from '@components/OneTwo'

function App() {
	return (
		<div className="App">
			<OneTwo />
			<Router />
		</div>
	)
}

export default App
