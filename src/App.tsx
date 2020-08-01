/** @jsx jsx */
import { jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Authorized } from './pages/Authorized';
import { SpotifyProvider } from './spotify/SpotifyProvider';
import { Login } from './pages/Login';
import './App.less';
import { SpotifyPlayer } from './spotify/SpotifyPlayer';
import { isProduction } from './utils/isProduction';

function App() {
	return (
		<div className='App'>
			<Router>
				<SpotifyProvider
					clientId='214fae6f678b45e1a4954739be29072a'
					redirectUri='/authorized'
				>
					<Switch>
						<Route path='/login'>
							<Login />
						</Route>

						<Route path='/authorized'>
							<Authorized />
						</Route>
						<SpotifyPlayer>
							<Route path='/'>
								<Home />
							</Route>
						</SpotifyPlayer>
					</Switch>
				</SpotifyProvider>
			</Router>
		</div>
	);
}

export default App;
