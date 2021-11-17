import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap"

function App() {
	return (
		<div style={{
			display: 'block', width: 700, padding: 30
		}}>
			<h4>ReactJS Reactstrap Spinner Component</h4>
			<Spinner style={{ width: '2rem', height: '2rem' }}
				children={false} />
		</div>
	);
}

export default App;
