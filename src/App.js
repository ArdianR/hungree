import React, { useEffect, useState } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch
} from "react-router-dom";

import { auth } from "./services/firebase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
	const [login, setLogin] = useState(false);
	
	useEffect(() => {
		auth().onAuthStateChanged((result) => {
			if (result === null) {
				return setLogin(false);
			}
			return setLogin(true);
		});
	});
	
	return (
		login ?
		<Dashboard />
		:
		<Router>
			<Switch>
				<Route exact path="/" component={Login}></Route>
				<Route path="/register" component={Register}></Route>
			</Switch>
		</Router>
	);
}

export default App;
