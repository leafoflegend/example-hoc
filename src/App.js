import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';

const simAxios = () => {
	const delay = new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});

	return delay;
};

const MountComponentWrapper = (Comp, route, callback) => {
	return class MountedComponent extends Component {
		state = {};

		componentDidMount () {
			simAxios(route)
				.then((data) => {
					// Obviously, supposed to return an object with this callback
					// The return value of that callback, is going to become the state.
					this.setState(callback(data));
				});
		}

		render () {
			// Im checking that any state exists
			const keysOnState = Object.keys(this.state).length > 0;

			return (
				keysOnState
					? (
						<Comp {...this.state} />
					) : null
			);
		}
	}
}

const DisplayImage = ({ imageUrl }) => (
	<div>
		<img src={imageUrl} />
	</div>
);

const SetStateCallback = () => {
	return {
		imageUrl: 'https://i.ytimg.com/vi/shIqk_DGrMQ/maxresdefault.jpg',
	};
};
const MountedDisplayImage = MountComponentWrapper(DisplayImage, 'whatever', SetStateCallback);

class App extends Component {
	render() {
		return (
			<main style={{ width: '100vw', height: '100vh', backgroundColor: '#cecece', padding: '10px' }}>
				<MountedDisplayImage />
			</main>
		)
	}
}

export default App;




