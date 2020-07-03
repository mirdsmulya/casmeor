import React from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component { 

	render() {
		return(
            <BrowserRouter>
			<div>
				{this.props.children}
			</div>
            </BrowserRouter>
			);
	}
}
export default App;