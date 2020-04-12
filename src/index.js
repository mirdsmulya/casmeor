import React, {propTypes} from 'react';
import { render } from 'react-dom';
import './styles/styles.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import {loadMenu} from './actions/menuAction';
import {loadOrder} from './actions/orderAction';
import configureStore from './stores/configureStrore';
import { Provider } from 'react-redux'; 
import routes from './routes';
import { Router, browserHistory } from 'react-router';

const store = configureStore();
store.dispatch(loadMenu());
store.dispatch(loadOrder());


render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.getElementById('app')
);
