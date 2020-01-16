import React, {propTypes} from 'react';
import { render } from 'react-dom';
import './styles/styles.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

import App from './component/App';
import { BrowserRouter as Router } from 'react-router-dom';



render(
	<Router>
		<App />
	</Router> ,
	document.getElementById('app')
);
