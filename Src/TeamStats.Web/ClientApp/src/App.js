import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/registration'>
					<Registration />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
